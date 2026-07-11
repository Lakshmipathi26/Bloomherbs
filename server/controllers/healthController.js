const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const razorpay = require('razorpay');
const logger = require('../utils/logger');

const healthCheck = async (req, res) => {
  const health = {
    success: true,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    services: {},
  };

  // MongoDB check
  try {
    const dbState = mongoose.connection.readyState;
    health.services.mongodb = {
      status: dbState === 1 ? 'connected' : 'disconnected',
      host: mongoose.connection.host,
    };
    if (dbState !== 1) health.success = false;
  } catch (err) {
    health.services.mongodb = { status: 'error', message: err.message };
    health.success = false;
  }

  // Cloudinary check
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      await cloudinary.api.ping();
      health.services.cloudinary = { status: 'connected' };
    } else {
      health.services.cloudinary = { status: 'skipped', reason: 'Not configured' };
    }
  } catch (err) {
    health.services.cloudinary = { status: 'error', message: err.message };
    health.success = false;
  }

  // Razorpay check
  try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const rp = new razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
      await rp.orders.all({ count: 1 });
      health.services.razorpay = { status: 'connected' };
    } else {
      health.services.razorpay = { status: 'skipped', reason: 'Not configured' };
    }
  } catch (err) {
    health.services.razorpay = { status: 'error', message: err.message };
    health.success = false;
  }

  // SMTP check
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      health.services.smtp = { status: 'configured' };
    } else {
      health.services.smtp = { status: 'skipped', reason: 'Not configured' };
    }
  } catch (err) {
    health.services.smtp = { status: 'error', message: err.message };
  }

  const statusCode = health.success ? 200 : 503;
  return res.status(statusCode).json(health);
};

module.exports = { healthCheck };
