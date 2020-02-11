const request = require('request');

class UserHelper {
    constructor(ctx) {
        this._ctx = ctx;
    }

    async refreshToken(access_token) {
        let user = await this._ctx.userQuery.findByAccessToken(access_token)
        let options = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            form: {
                grant_type: 'refresh_token',
                refresh_token: user.refresh_token
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
            },
            json: true
        }
        let newAccessToken = await new Promise((resolve, reject) => {
            request.post(options, (err, response, body) => {
                if (!body.error) {
                    resolve(body.access_token)
                }
                else {
                    console.log(body.error)
                    reject(err)
                }
            });
        });
        await this._ctx.userQuery.insertOrUpdate(user.id, user.display_name, newAccessToken, user.refresh_token);
        return newAccessToken;
    }

    async getTokens(authOptions) {
        return new Promise((resolve, reject) => {
            request.post(authOptions, (err, response, body) => {
                if (!response.error) {
                    this.access_token = body.access_token;
                    this.refresh_token = body.refresh_token;
                    resolve(this);
                } 
                else {
                    reject(err);
                }
            });
        });
    }

    async getAccountInfo(options) {
        return new Promise((resolve, reject) => {
            request.get(options, (err, response, body) => {
                if (!response.error) {
                    this.display_name = body.display_name;
                    this.id = body.id;
                    resolve(this);
                }
                else {
                    reject(err);
                }
            });
        });
    };

    async getDeviceId(access_token) {
        let options = {
            url: 'https://api.spotify.com/v1/me/player/devices',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }
        let devices = await new Promise((resolve, reject) => {
            request.get(options, (err, response, body) => {
                body = JSON.parse(body)
                if (!body.error) {
                    resolve(body)
                }
                else {
                    reject(err);
                }
            });
        });
        return devices.devices
    }
}

module.exports = UserHelper;