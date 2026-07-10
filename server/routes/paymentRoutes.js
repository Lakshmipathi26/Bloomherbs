const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createRazorpayOrder, verifyPayment, getRazorpayKey } = require('../controllers/paymentController');

router.get('/razorpay-key', getRazorpayKey);
router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);

module.exports = router;
