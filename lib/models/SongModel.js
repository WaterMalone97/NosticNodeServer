const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    song: {
        type: JSON,
        required: true
    }
});

module.exports = mongoose.model('Song', songSchema);