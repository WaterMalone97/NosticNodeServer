const Follow = require('../models/FollowModel');
class FollowQuery {
    constructor(ctx) {
        this._ctx = ctx;
    }
    
    async follow(id, userId) {
        if (!id || !userId) {
            throw Error('Id required');
            //new song. insert it into the db
        }
        let result = await Follow.find({id, userId});
        if (result.length > 0) {
            // user already follows that account
            return 1;
        }
        let follow = new Follow({id, userId});
        await follow.save();
        return 1;
    }

    async getFollowedAccounts(id) {
        if (!id) {
            throw Error('Id required');
        }
        let followedAccounts = await Follow.find({id});
        return followedAccounts.map(account => account.userId);
    }
}

module.exports = FollowQuery;