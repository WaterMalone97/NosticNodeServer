const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songId: {
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
    },
    caption: {
        type: String,
        required: false,
        validate: [
            {
                validator: c => c.length > 1 && c.length <= 250,
                message: 'Caption should be between 1 and 250 characters'
            }
        ]
    }
});
module.exports = mongoose.model('Song', songSchema);