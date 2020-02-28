const mongoose = require('mongoose');
const followSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: JSON,
        required: true
    }
});
module.exports = mongoose.model('Follow', followSchema);