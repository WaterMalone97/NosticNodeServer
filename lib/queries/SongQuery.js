const Song = require('../models/SongModel');

class SongQuery {
    constructor(ctx) {
        this._ctx = ctx;

    }
    async insertIfNotExists(songToInsert) {
        let result = await Song.find({id: songToInsert.id});
        if (!result || result.length === 0) {
            //new song. insert it into the db
            let song = new Song({id: songToInsert.id, song: songToInsert});
            await song.save();
            return song;
        }
        console.log('Song already exists in db');
        return result;
    }
    async select(id) {
        if (!id) {
            throw Error('Song ID required');
        }
        let song = await Song.find({id});
        return song;
    }
}

module.exports = SongQuery;