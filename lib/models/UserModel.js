const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: false
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
