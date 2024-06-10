import React, { useState } from 'react';
import axios from 'axios';

const BorrowBook = () => {
    const [bookId, setBookId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:5000/books/borrow/${bookId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Book borrowed successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <button type="submit">Borrow Book</button>
        </form>
    );
};

export default BorrowBook;
