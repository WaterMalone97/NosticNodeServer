const Song = require('../models/SongModel');
const uuid = require('uuid');
const sanitize = require('mongo-sanitize');


class SongQuery {
    constructor(ctx) {
        this._ctx = ctx;
    }

    async insert(songId, userId, caption = undefined) {
        //TODO: figure out if user already saved song
        if (!songId || !userId) {
            throw Error('Id required');
            //new song. insert it into the db
        }
        let timeStamp = Date.now();
        if (caption) {
            caption = sanitize(caption);
        }
        let song = new Song({timeStamp, songId, userId, caption});
        await song.save();
        console.log('Song shared');
        return 1;
    }

    async selectByUserId(userIds) {
        if (!userIds || userIds.length === 0) {
            throw Error('User id required');
        }
        userIds = Array.isArray(userIds) ? userIds : [userIds];
        let songs = await Song.find({userId: {$in : userIds}});
        if (songs.length === 0) {
            return [];
        }
        return songs;
    }
}

module.exports = SongQuery;