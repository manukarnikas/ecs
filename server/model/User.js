const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema  = new Schema({
    _id:{
        type: 'string',
        required: true,
    },
    username: {
        type: 'string',
        required: true,
        unique:true
    },
    password: {
        type: 'string',
        required: true
    },
    thumbnailUrl: {
        type: 'string',
        required: true
    }
});

const User  = mongoose.model('User',userSchema);

module.exports = User;