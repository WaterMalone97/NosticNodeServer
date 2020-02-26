const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Song', songSchema);