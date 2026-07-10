const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const AppError = require('../utils/AppError');

const populateCart = (query) => query.populate('items.product', 'name images price stock slug');

exports.getCart = async (req, res) => {
  let cart = await populateCart(Cart.findOne({ user: req.user.id }));
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
  res.json({ success: true, cart });
};

exports.addToCart = async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product || !product.isActive) return next(new AppError('Product not found', 404));
  if (product.stock < quantity) return next(new AppError('Insufficient stock', 400));

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });

  const existingItem = cart.items.find((i) => i.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price = product.price;
  } else {
    cart.items.push({ product: productId, quantity, price: product.price });
  }
  await cart.save();
  cart = await populateCart(Cart.findById(cart._id));
  res.json({ success: true, cart });
};

exports.updateCartItem = async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return next(new AppError('Cart not found', 404));

  const item = cart.items.find((i) => i.product.toString() === req.params.productId);
  if (!item) return next(new AppError('Item not in cart', 404));

  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
  } else {
    item.quantity = quantity;
  }
  await cart.save();
  const updated = await populateCart(Cart.findById(cart._id));
  res.json({ success: true, cart: updated });
};

exports.removeFromCart = async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return next(new AppError('Cart not found', 404));
  cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
  await cart.save();
  const updated = await populateCart(Cart.findById(cart._id));
  res.json({ success: true, cart: updated });
};

exports.clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [], coupon: null, discountAmount: 0 });
  res.json({ success: true, message: 'Cart cleared' });
};

exports.applyCoupon = async (req, res, next) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true, expiresAt: { $gt: Date.now() } });
  if (!coupon) return next(new AppError('Invalid or expired coupon', 400));
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return next(new AppError('Coupon usage limit reached', 400));
  if (coupon.usedBy.includes(req.user.id)) return next(new AppError('Coupon already used', 400));

  const cart = await populateCart(Cart.findOne({ user: req.user.id }));
  if (!cart) return next(new AppError('Cart not found', 404));

  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (subtotal < coupon.minOrderAmount) {
    return next(new AppError(`Minimum order amount is ₹${coupon.minOrderAmount}`, 400));
  }

  let discount = coupon.discountType === 'percentage' ? (subtotal * coupon.discountValue) / 100 : coupon.discountValue;
  if (coupon.maxDiscountAmount) discount = Math.min(discount, coupon.maxDiscountAmount);

  cart.coupon = coupon._id;
  cart.discountAmount = discount;
  await cart.save();
  res.json({ success: true, discount, coupon: { code: coupon.code, discountType: coupon.discountType, discountValue: coupon.discountValue } });
};

exports.removeCoupon = async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user.id }, { coupon: null, discountAmount: 0 });
  res.json({ success: true, message: 'Coupon removed' });
};
