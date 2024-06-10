const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publication_year: { type: Number, required: true },
  borrowed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookSchema);
