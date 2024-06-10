import React, { useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:5000/books/${id}`);
        alert('Book deleted successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Book ID" value={id} onChange={(e) => setId(e.target.value)} />
            <button type="submit">Delete Book</button>
        </form>
    );
};

export default DeleteBook;
