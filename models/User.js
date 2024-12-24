const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    toJSON: { virtuals: true, versionKey: false }, // Exclude __v
    toObject: { virtuals: true, versionKey: false } // Exclude __v
});

module.exports = mongoose.model('User', userSchema);
