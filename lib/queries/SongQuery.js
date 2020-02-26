const Song = require('../models/SongModel');
const uuid = require('uuid');

class SongQuery {
    constructor(ctx) {
        this._ctx = ctx;
    }

    async insert(uri, userId) {
        //TODO: figure out if user already saved song
        if (!uri || !userId) {
            throw Error('Id required');
            //new song. insert it into the db
        }
        let timeStamp = Date.now();
        let song = new Song({timeStamp, uri, userId});
        await song.save();
        console.log('Song shared');
        return 1;
    }

    async selectById(userId) {
        if (!userId) {
            throw Error('User id required');
        }
        let songs = await Song.find({userId});
        if (songs.length === 0) {
            return [];
        }
        return song;
    }
}

module.exports = SongQuery;