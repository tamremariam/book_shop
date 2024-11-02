const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');

router.get('/', bookController.getBooks);
router.get('/:isbn', bookController.getBookByISBN);
router.get('/author/:author', bookController.getBooksByAuthor);
router.get('/title/:title', bookController.getBooksByTitle);
router.get('/:isbn/reviews', bookController.getBookReviews);

router.post('/:isbn/review', auth, bookController.addReview);
router.delete('/:isbn/review', auth, bookController.deleteReview);


module.exports = router;
