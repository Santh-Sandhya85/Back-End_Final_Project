const mongoose = require('mongoose');
const Book = require('./models/Book'); // Adjust the path if necessary
require('dotenv').config();

const seedBooks = async () => {
    const books = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565' },
        { title: '1984', author: 'George Orwell', isbn: '9780451524935' },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084' },
        { title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769488' },
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227' },
    ];

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Book.deleteMany(); // Clear existing books
        await Book.insertMany(books); // Insert new books
        console.log('Database seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedBooks();
