const cloudinary = require('cloudinary').v2;
const logger = require('./logger');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
  cloudinary.api.ping()
    .then(() => logger.info('✅ Cloudinary connected'))
    .catch((err) => logger.error('Cloudinary connection failed', err));
}

module.exports = cloudinary;
