// const express = require('express');
// const { addReview, deleteReview } = require('../controllers/reviewController');
// const authenticateToken = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/:bookId', authenticateToken, addReview);
// router.delete('/:reviewId', authenticateToken, deleteReview);

// module.exports = router;
// const express = require('express');
// const { addReview, deleteReview, getReviewsByBookId } = require('../controllers/reviewController');
// const authenticateToken = require('../middleware/authMiddleware'); // Middleware to authenticate user
// const router = express.Router();

// router.post('/:bookId', authenticateToken, addReview); // Route to add a review
// router.delete('/:reviewId', authenticateToken, deleteReview); // Route to delete a review
// router.get('/book/:bookId', getReviewsByBookId); // Route to get reviews by book ID

// // Route to update a review
// router.put('/:reviewId', authenticateToken, updateReview);


const express = require('express');
const { addReview, deleteReview, getReviewsByBookId, updateReview, getReviewById } = require('../controllers/reviewController'); // Ensure updateReview is included
const authenticateToken = require('../middleware/authMiddleware'); // Middleware to authenticate user
const router = express.Router();

// Route to add a review
router.post('/:bookId', authenticateToken, addReview);

// Route to delete a review
router.delete('/:reviewId', authenticateToken, deleteReview);

// Route to get reviews by book ID
router.get('/book/:bookId', getReviewsByBookId);

// Route to update a review
router.put('/:reviewId', authenticateToken, updateReview); // Ensure this route is defined

// Route to get a review by ID
router.get('/:reviewId', getReviewById); // New route for getting a review by ID

module.exports = router;
