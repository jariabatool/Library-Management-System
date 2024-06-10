import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBorrowedBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/books/borrowed', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(response.data);
        };

        fetchBorrowedBooks();
    }, []);

    return (
        <div>
            <ul>
                {books.map(book => (
                    <li key={book._id}>{book.title} by {book.author} ({book.genre}, {book.publication_year})</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewBorrowedBooks;
