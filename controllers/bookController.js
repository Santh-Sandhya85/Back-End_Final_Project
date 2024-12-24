const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getBookByISBN = async (req, res) => {
//     try {
//         const book = await Book.findOne({ isbn: req.params.isbn });
//         if (!book) return res.status(404).json({ message: 'Book not found' });
//         res.json(book);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getBooksByAuthor = async (req, res) => {
//     try {
//         const books = await Book.find({ author: req.params.author });
//         res.json(books);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getBooksByTitle = async (req, res) => {
//     try {
//         const books = await Book.find({ title: new RegExp(req.params.title, 'i') });
//         res.json(books);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// exports.getAllBooks = (req, res) => {
//     // Using an async callback function
//     Book.find({}, (err, books) => {
//         if (err) {
//             return res.status(500).json({ message: err.message });
//         }
//         res.json(books); // Respond with the list of books
//     });
// };

// Task 11: Search by ISBN using Promises
exports.getBookByISBN = (req, res) => {
    const { isbn } = req.params;
    Book.findOne({ isbn })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Task 12: search by Author using Async/Await
exports.getBooksByAuthor = async (req, res) => {
    const { author } = req.params;
    try {
        const books = await Book.find({ author });
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found for this author' });
        }
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Task 13: Search by Title using Async/Await
exports.getBooksByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const books = await Book.find({ title: new RegExp(title, 'i') }); // Case-insensitive search
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found with this title' });
        }
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
