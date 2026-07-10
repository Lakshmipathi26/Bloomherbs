const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/sendEmail');

exports.createOrder = async (req, res, next) => {
  const { shippingAddress, paymentMethod, notes } = req.body;

  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) return next(new AppError('Cart is empty', 400));

  // Validate stock
  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      return next(new AppError(`Insufficient stock for ${item.product.name}`, 400));
    }
  }

  const itemsPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingPrice = itemsPrice >= 500 ? 0 : 50;
  const taxPrice = Math.round(itemsPrice * 0.05);
  const totalPrice = itemsPrice + shippingPrice + taxPrice - (cart.discountAmount || 0);

  const order = await Order.create({
    user: req.user.id,
    items: cart.items.map((i) => ({ product: i.product._id, quantity: i.quantity, price: i.price })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    discountAmount: cart.discountAmount || 0,
    totalPrice,
    coupon: cart.coupon,
    notes,
    statusHistory: [{ status: 'pending', note: 'Order placed' }],
  });

  // Deduct stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity, soldCount: item.quantity },
    });
  }

  // Update coupon usage
  if (cart.coupon) {
    await Coupon.findByIdAndUpdate(cart.coupon, {
      $inc: { usedCount: 1 },
      $push: { usedBy: req.user.id },
    });
  }

  // Clear cart
  await Cart.findByIdAndUpdate(cart._id, { items: [], coupon: null, discountAmount: 0 });

  res.status(201).json({ success: true, order });
};

exports.getMyOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    Order.find({ user: req.user.id }).sort('-createdAt').skip(skip).limit(limit).populate('items.product', 'name images'),
    Order.countDocuments({ user: req.user.id }),
  ]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), orders });
};

exports.getOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'name images slug');
  if (!order) return next(new AppError('Order not found', 404));
  if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized', 403));
  }
  res.json({ success: true, order });
};

exports.cancelOrder = async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
  if (!order) return next(new AppError('Order not found', 404));
  if (!['pending', 'confirmed'].includes(order.orderStatus)) {
    return next(new AppError('Order cannot be cancelled at this stage', 400));
  }
  order.orderStatus = 'cancelled';
  order.statusHistory.push({ status: 'cancelled', note: req.body.reason || 'Cancelled by customer' });
  await order.save();

  // Restore stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity, soldCount: -item.quantity } });
  }
  res.json({ success: true, order });
};

exports.getAllOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const filter = req.query.status ? { orderStatus: req.query.status } : {};
  const [orders, total] = await Promise.all([
    Order.find(filter).sort('-createdAt').skip(skip).limit(limit).populate('user', 'name email'),
    Order.countDocuments(filter),
  ]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), orders });
};

exports.updateOrderStatus = async (req, res, next) => {
  const { status, note, trackingNumber } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError('Order not found', 404));

  order.orderStatus = status;
  order.statusHistory.push({ status, note });
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (status === 'delivered') { order.isDelivered = true; order.deliveredAt = Date.now(); }
  await order.save();
  res.json({ success: true, order });
};

exports.getOrderStats = async (req, res) => {
  const stats = await Order.aggregate([
    { $match: { orderStatus: { $ne: 'cancelled' } } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
        totalOrders: { $sum: 1 },
        avgOrderValue: { $avg: '$totalPrice' },
      },
    },
  ]);
  res.json({ success: true, stats: stats[0] || {} });
};
