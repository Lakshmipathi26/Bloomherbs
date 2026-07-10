const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
} = require('../controllers/reviewController');

router.get('/product/:productId', getProductReviews);
router.use(protect);
router.post('/product/:productId', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/', authorize('admin'), getAllReviews);

module.exports = router;
