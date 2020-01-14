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
    },
    song_ids: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);