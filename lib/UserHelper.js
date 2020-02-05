const request = require('request');

class UserHelper {
    constructor(ctx) {
        this._ctx = ctx;
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