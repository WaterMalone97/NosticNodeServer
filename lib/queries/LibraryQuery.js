const Library = require('../models/LibraryModel');
const uuid = require('uuid');
class LibraryQuery {
    constructor(ctx) {
        this._ctx = ctx;
    }
    
    async insert(songId, userId) {
        //TODO: figure out if user already saved song
        if (!songId || !userId) {
            throw Error('Id required');
            //new song. insert it into the db
        }
        let library = new Library({id:uuid(), songId, userId});
        await library.save();
        console.log('Song saved');
        return 1;
    }
}

module.exports = LibraryQuery;