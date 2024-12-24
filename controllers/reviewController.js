const Review = require('../models/Review');
const Book = require('../models/Book');


exports.addReview = async (req, res) => {
    const { content } = req.body;
    const review = new Review({ bookId: req.params.bookId, userId: req.user.id, content });
    try {
        await review.save();
        await Book.findByIdAndUpdate(req.params.bookId, { $push: { reviews: review._id } });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getReviewsByBookId = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'username'); // Populate userId for username
        
        // If no reviews found, return an empty JSON object
        if (reviews.length === 0) {
            return res.json({}); // Return an empty JSON object
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get a review by ID
exports.getReviewById = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId).populate('userId', 'username'); // Populate userId to get the username
        
        // If the review is not found, return an empty object
        if (!review) {
            return res.json({}); // Return an empty JSON object
        }

        res.json(review); // Respond with the review
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        // Find the review by ID
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user is authorized to delete the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        // Use findByIdAndDelete to remove the review
        await Review.findByIdAndDelete(reviewId); // Correct way to delete a review
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Function to update a review
exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { content } = req.body;

    try {
        // Find the review by ID
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user is authorized to update the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        // Update the review content
        review.content = content;
        await review.save(); // Save the updated review

        res.json(review); // Respond with the updated review
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.addReview = async (req, res) => {
//     const { content } = req.body;

//     // Check if the book exists
//     const book = await Book.findById(req.params.bookId);
//     if (!book) {
//         return res.status(404).json({ message: 'Book not found' });
//     }

//     // Create a new review
//     const review = new Review({
//         bookId: req.params.bookId,
//         userId: req.user.id, // Assuming you have user ID from the JWT token
//         content
//     });

//     try {
//         await review.save(); // Save the review
//         await Book.findByIdAndUpdate(req.params.bookId, { $push: { reviews: review._id } }); // Update the book with the new review
//         res.status(201).json(review); // Respond with the created review
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

