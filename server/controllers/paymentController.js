const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Coupon = require('../models/Coupon');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/sendEmail');
const logger = require('../utils/logger');

exports.getRazorpayKey = (req, res) => {
  res.json({ success: true, key: process.env.RAZORPAY_KEY_ID });
};

exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body; // amount in paise
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    logger.info(`Razorpay order created: ${order.id} for amount ${amount}`);
    res.json({ success: true, order });
  } catch (error) {
    logger.error('Razorpay order creation failed', error);
    next(new AppError('Payment initiation failed', 500));
  }
};

exports.verifyPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    logger.warn('Payment verification failed: signature mismatch');
    return next(new AppError('Payment verification failed', 400));
  }

  try {
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

    // Clear cart and update coupon usage
    await Cart.findOneAndUpdate({ user: order.user }, { items: [], coupon: null, discountAmount: 0 });
    if (order.coupon) {
      await Coupon.findByIdAndUpdate(order.coupon, { $inc: { usedCount: 1 }, $push: { usedBy: order.user } });
    }

    // Send confirmation email
    try {
      await sendEmail({
        to: order.user.email,
        subject: `Order Confirmed - ${order.orderNumber}`,
        html: `<h1>Thank you for your order!</h1><p>Order #${order.orderNumber} has been confirmed.</p><p>Total: $${order.totalPrice.toFixed(2)}</p>`,
      });
    } catch (emailError) {
      logger.error('Failed to send order confirmation email', emailError);
    }

    logger.info(`Payment verified for order ${order.orderNumber}`);
    res.json({ success: true, order });
  } catch (error) {
    logger.error('Payment verification error', error);
    next(new AppError('Payment verification failed', 500));
  }
};
