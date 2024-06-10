import React, { useState } from 'react';
import axios from 'axios';

const ReturnBook = () => {
    const [bookId, setBookId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:5000/books/return/${bookId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Book returned successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <button type="submit">Return Book</button>
        </form>
    );
};

export default ReturnBook;
