const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, {
    toJSON: { virtuals: true, versionKey: false }, // Exclude __v
    toObject: { virtuals: true, versionKey: false } // Exclude __v
});

module.exports = mongoose.model('Review', reviewSchema);
