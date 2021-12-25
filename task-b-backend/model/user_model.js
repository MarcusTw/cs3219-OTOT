const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}