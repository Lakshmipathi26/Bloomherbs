const Review = require('../models/Review');
const Order = require('../models/Order');
const AppError = require('../utils/AppError');

exports.getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId, isApproved: true })
    .populate('user', 'name avatar')
    .sort('-createdAt');
  res.json({ success: true, reviews });
};

exports.addReview = async (req, res, next) => {
  const existing = await Review.findOne({ user: req.user.id, product: req.params.productId });
  if (existing) return next(new AppError('You have already reviewed this product', 400));

  // Check verified purchase
  const order = await Order.findOne({
    user: req.user.id,
    'items.product': req.params.productId,
    orderStatus: 'delivered',
  });

  const review = await Review.create({
    user: req.user.id,
    product: req.params.productId,
    ...req.body,
    isVerifiedPurchase: !!order,
  });
  await review.populate('user', 'name avatar');
  res.status(201).json({ success: true, review });
};

exports.updateReview = async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!review) return next(new AppError('Review not found', 404));
  await Review.calcAverageRatings(review.product);
  res.json({ success: true, review });
};

exports.deleteReview = async (req, res, next) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) return next(new AppError('Review not found', 404));
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized', 403));
  }
  await review.deleteOne();
  res.json({ success: true, message: 'Review deleted' });
};

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find()
    .populate('user', 'name')
    .populate('product', 'name')
    .sort('-createdAt');
  res.json({ success: true, reviews });
};
