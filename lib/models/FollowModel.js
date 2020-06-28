const mongoose = require('mongoose');
const followSchema = new mongoose.Schema({
    id: { // The ID of the user's account
        type: String,
        required: true
    },
    userId: { //The ID of the account the user follows
        type: JSON,
        required: true
    }
});
module.exports = mongoose.model('Follow', followSchema);