const User = require('../models/UserModel');

class UserQuery {
    constructor(ctx) {
        this._ctx = ctx;
    }
    async insertOrUpdate(id, display_name, access_token, refresh_token) {
        let result = await User.find( {id} );
        if (!result || result.length === 0) {
            let user = new User({id, display_name, access_token, refresh_token})
            await user.save();
            return user;
        }
        else {
            await User.updateOne({id}, {display_name, access_token, refresh_token} );
            return result;
        }
    }
    async find(userId) {
       let result = await User.find( {id: userId} );
       if (!result) {
           throw Error('User not found');
       }
       return result[0];
    }

    async findByAccessToken(access_token) {
        let result = await User.find( {access_token} );
        if (!result) {
            throw Error('User not found');
        }
        return result[0];
    }
}

module.exports = UserQuery;
