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
            // user already follows that account... do nothing
            return 1;
        }
        //create need Follow and save to db
        let follow = new Follow({id, userId});
        await follow.save();
        return 1; 
    }

    async unfollow(id, userId) {
        if (!id || !userId) {
            throw Error('Id required');
            //new song. insert it into the db
        }
        let result = await Follow.find({id, userId});
        if (result.length > 0) {
            //unfollow the desired user by deleting data in db
            await Follow.deleteOne({id :"id", userId :"userId"});
            return 1;
        }
        //user does not follow the account... do nothing
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