const SongHelper = require('./SongHelper');
const UserHelper = require('./UserHelper');
const UserQuery = require('./queries/UserQuery');
const SongQuery = require('./queries/SongQuery');
const mongoose = require('mongoose');

class ServiceContext {
    constructor() {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
        this._db = mongoose.connection;
        this._songHelper = new SongHelper(this);
        this._userHelper = new UserHelper(this);
        this._userQuery = new UserQuery(this);
        this._songQuery = new SongQuery(this);
        this._db.on('error', (error) => console.log(error));
        this._db.once('open', () => console.log('Connected to database'));
    }

    /**
     * An instance of songQuery
     */
    get songQuery() {
        return this._songQuery;
    }

    /**
     * An instance of userQuery
     */
    get userQuery() {
        return this._userQuery
    }

    /**
     * Get an instance of the db
     */
    get db() {
        return this._db;
    }

    /**
     * Get an instance of song helper
     */
    get songHelper() {
        return this._songHelper;
    }

    /**
     * Get an instance of user helper
     */
    get userHelper() {
        return this._userHelper;
    }
}

module.exports = ServiceContext;