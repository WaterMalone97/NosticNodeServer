const request = require('request');

class SongHelper {

    constructor(ctx) {
        this._ctx = ctx;
    }

    async getSongsByIds(songIds, access_token) {
        let songIdsList = "";
        if (songIds.length > 1) {
            for (let songId of songIds) {
                songIdsList = `${songIdsList} ${songId},`;
            }
        }
        else {
            songIdsList = songIds[0];
        }
        songIdsList = songIdsList.trim();
        let options = {
            url: 'https://api.spotify.com/v1/tracks',
            method: 'GET',
            qs: {
                ids: songIdsList
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }
        let songs;
        try {
            songs = await this.getTracksHelper(options);
        }
        catch (err) {
            if (err === 'The access token expired') {
                let newAccessToken = await this._ctx.userHelper.refreshToken(access_token);
                options.headers.Authorization = 'Bearer ' + newAccessToken;
                songs = await this.getTracksHelper(options);
            }
        }
        return songs;
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

    async getTracksHelper(options) {
        return new Promise((resolve, reject) => {
            request.get(options, (err, response, body) => {
                body = JSON.parse(body);
                if (!err && !body.error) {
                    resolve(body.tracks);
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