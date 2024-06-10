import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationYear, setPublicationYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const book = { title, author, genre, publication_year: publicationYear };
        await axios.post('http://localhost:5000/books', book);
        alert('Book added successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <input type="number" placeholder="Publication Year" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
