const request = require('request');

class SongHelper {

    constructor(ctx) {
        this._ctx = ctx;
    }

    async getSong(options) {
        return new Promise((resolve, reject) => {
            request.get(options, (err, response, body) => {
                if (!body.error) {
                    this._tracks = response.body.tracks;
                    resolve(this._tracks.items);
                }
                else {
                    console.log(body);
                    reject(body.error.message);
                }
            });
        });
    }

    async getSavedSongList(options) {
        return new Promise((resolve, reject) => {
            request.get(options, (err, response, body) => {
                if (!body.error) {
                    this._tracks = response.body.tracks;
                    resolve(body.items);
                }
                else {
                    console.log(body);
                    reject(body.error.message);
                }
            });
        });
    }

    async playSong(options) {
        return new Promise((resolve, reject) => {
            request.put(options, (err, response, body) => {
                if (!err || !body.error) {
                    resolve(body)
                }
                else {
                    console.log(body);
                    reject(body.error.message);
                }
            });
        })
    }
}

module.exports = SongHelper;