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
}

module.exports = UserHelper;