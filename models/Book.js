const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, {
    toJSON: { virtuals: true, versionKey: false }, // Exclude __v
    toObject: { virtuals: true, versionKey: false } // Exclude __v
});

module.exports = mongoose.model('Book', bookSchema);
