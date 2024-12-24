const axios = require('axios');

// Base URL for the book API (adjust according to your server)
const API_URL = 'http://localhost:5000/api/books'; // Change this if your server runs on a different port or address

// Task 10: Get all books – Using async/await
const getAllBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('All Books:', response.data);
        return response.data; // Return the data for further processing if needed
    } catch (error) {
        console.error('Error fetching all books:', error.message);
        throw error; // Rethrow the error for further handling
    }
};

// Task 11: Search by ISBN – Using Promises
const getBookByISBN = (isbn) => {
    return axios.get(`${API_URL}/isbn/${isbn}`)
        .then(response => {
            console.log('Book found by ISBN:', response.data);
            return response.data; // Return the data for further processing if needed
        })
        .catch(error => {
            console.error('Error fetching book by ISBN:', error.message);
            throw error; // Rethrow the error for further handling
        });
};

// Task 12: Search by Author – Using async/await
const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(`${API_URL}/author/${author}`);
        console.log('Books found by Author:', response.data);
        return response.data; // Return the data for further processing if needed
    } catch (error) {
        console.error('Error fetching books by author:', error.message);
        throw error; // Rethrow the error for further handling
    }
};

// Task 13: Search by Title – Using async/await
const getBooksByTitle = async (title) => {
    try {
        const response = await axios.get(`${API_URL}/title/${title}`);
        console.log('Books found by Title:', response.data);
        return response.data; // Return the data for further processing if needed
    } catch (error) {
        console.error('Error fetching books by title:', error.message);
        throw error; // Rethrow the error for further handling
    }
};

// Example Usage
const run = async () => {
    console.log('Fetching all books...');
    await getAllBooks();

    console.log('Searching for book by ISBN...');
    await getBookByISBN('9780547928227'); // Replace with a valid ISBN

    console.log('Searching for books by author...');
    await getBooksByAuthor('J.R.R. Tolkien'); // Replace with a valid author name

    console.log('Searching for books by title...');
    await getBooksByTitle('The Hobbit'); // Replace with a valid title
};

// Uncomment to run the example usage
run();

// module.exports = {
//     getAllBooks,
//     getBookByISBN,
//     getBooksByAuthor,
//     getBooksByTitle
// };
