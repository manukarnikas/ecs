const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema  = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Array,
        required: true
    }
});

const Board  = mongoose.model('Board',boardSchema);

module.exports = Board;