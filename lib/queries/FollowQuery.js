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

    async getFollowedAccountIds(id) {
        if (!id) {
            throw Error('Id required');
        }
        let ids = await Follow.find({id}, {userId: 1});
        return ids.map(id => id.userId);
    }
}

module.exports = FollowQuery;