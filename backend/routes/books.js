const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

//add a book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update a book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete a book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//view books
router.get('/', async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//borrow a book
router.post('/borrow/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.borrowed) return res.status(400).json({ message: 'Book is already borrowed' });

    const user = await User.findById(req.user.id);
    book.borrowed = true;
    user.borrowedBooks.push(book._id);

    await book.save();
    await user.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//return a book
router.post('/return/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.borrowed) return res.status(400).json({ message: 'Book is not borrowed' });

    const user = await User.findById(req.user.id);
    book.borrowed = false;
    user.borrowedBooks.pull(book._id);

    await book.save();
    await user.save();

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//view borrowed books
router.get('/borrowed', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('borrowedBooks');
    res.json(user.borrowedBooks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
