const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const Order = require('../models/Order');
const AppError = require('../utils/AppError');

exports.getRazorpayKey = (req, res) => {
  res.json({ success: true, key: process.env.RAZORPAY_KEY_ID });
};

exports.createRazorpayOrder = async (req, res, next) => {
  const { amount } = req.body; // amount in paise
  const options = {
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  res.json({ success: true, order });
};

exports.verifyPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return next(new AppError('Payment verification failed', 400));
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      isPaid: true,
      paidAt: Date.now(),
      orderStatus: 'confirmed',
      paymentResult: { razorpay_order_id, razorpay_payment_id, razorpay_signature, status: 'paid' },
      $push: { statusHistory: { status: 'confirmed', note: 'Payment received' } },
    },
    { new: true }
  );

  if (!order) return next(new AppError('Order not found', 404));
  res.json({ success: true, order });
};
