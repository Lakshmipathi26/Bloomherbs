const Coupon = require('../models/Coupon');
const AppError = require('../utils/AppError');

exports.validateCoupon = async (req, res, next) => {
  const { code, orderAmount } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true, expiresAt: { $gt: Date.now() } });
  if (!coupon) return next(new AppError('Invalid or expired coupon', 400));
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return next(new AppError('Coupon usage limit reached', 400));
  if (coupon.usedBy.includes(req.user.id)) return next(new AppError('Coupon already used', 400));
  if (orderAmount < coupon.minOrderAmount) return next(new AppError(`Minimum order ₹${coupon.minOrderAmount}`, 400));

  let discount = coupon.discountType === 'percentage' ? (orderAmount * coupon.discountValue) / 100 : coupon.discountValue;
  if (coupon.maxDiscountAmount) discount = Math.min(discount, coupon.maxDiscountAmount);

  res.json({ success: true, discount, coupon: { code: coupon.code, discountType: coupon.discountType, discountValue: coupon.discountValue } });
};

exports.getCoupons = async (req, res) => {
  const coupons = await Coupon.find().sort('-createdAt');
  res.json({ success: true, coupons });
};

exports.createCoupon = async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ success: true, coupon });
};

exports.updateCoupon = async (req, res, next) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!coupon) return next(new AppError('Coupon not found', 404));
  res.json({ success: true, coupon });
};

exports.deleteCoupon = async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) return next(new AppError('Coupon not found', 404));
  res.json({ success: true, message: 'Coupon deleted' });
};
