const { books } = require('../config/dbConfig');

exports.getBooks = (req, res) => {
  res.json(books);
};

exports.getBookByISBN = (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) return res.json(book);
  res.status(404).json({ message: 'Book not found' });
};

exports.getBooksByAuthor = (req, res) => {
  const authorBooks = books.filter(b => b.author === req.params.author);
  res.json(authorBooks);
};

exports.getBooksByTitle = (req, res) => {
  const titleBooks = books.filter(b => b.title.includes(req.params.title));
  res.json(titleBooks);
};

exports.getBookReviews = (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) return res.json(book.reviews);
  res.status(404).json({ message: 'Book not found' });
};

exports.addReview = (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    book.reviews.push({ user: req.user.username, review });
    res.json({ message: 'Review added', book });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

exports.deleteReview = (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    book.reviews = book.reviews.filter(r => r.user !== req.user.username);
    res.json({ message: 'Review deleted', book });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};
