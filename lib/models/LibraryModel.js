const mongoose = require('mongoose');
const librarySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: JSON,
        required: true
    },
    songId: {
        type: JSON,
        required: true
    }
});
module.exports = mongoose.model('Library', librarySchema);