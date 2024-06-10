import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Library Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book._id}>{book.title} by {book.author} ({book.genre}, {book.publication_year})</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewBooks;
