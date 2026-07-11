require('dotenv').config();

const requiredEnvVars = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 7,
  CLIENT_URL: process.env.CLIENT_URL,
};

const optionalEnvVars = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.FROM_EMAIL,
  FROM_NAME: process.env.FROM_NAME,
};

const missingRequired = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingRequired.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingRequired.forEach((key) => console.error(`   - ${key}`));
  process.exit(1);
}

const missingOptional = Object.entries(optionalEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingOptional.length > 0) {
  console.warn('⚠️  Missing optional environment variables:');
  missingOptional.forEach((key) => console.warn(`   - ${key}`));
}

module.exports = {
  env: requiredEnvVars.NODE_ENV,
  port: requiredEnvVars.PORT,
  mongoUri: requiredEnvVars.MONGO_URI,
  jwtSecret: requiredEnvVars.JWT_SECRET,
  jwtExpire: requiredEnvVars.JWT_EXPIRE,
  jwtCookieExpire: requiredEnvVars.JWT_COOKIE_EXPIRE,
  clientUrl: requiredEnvVars.CLIENT_URL,
  cloudinary: {
    cloudName: optionalEnvVars.CLOUDINARY_CLOUD_NAME,
    apiKey: optionalEnvVars.CLOUDINARY_API_KEY,
    apiSecret: optionalEnvVars.CLOUDINARY_API_SECRET,
  },
  razorpay: {
    keyId: optionalEnvVars.RAZORPAY_KEY_ID,
    keySecret: optionalEnvVars.RAZORPAY_KEY_SECRET,
  },
  smtp: {
    host: optionalEnvVars.SMTP_HOST,
    port: optionalEnvVars.SMTP_PORT,
    email: optionalEnvVars.SMTP_EMAIL,
    password: optionalEnvVars.SMTP_PASSWORD,
  },
  fromEmail: optionalEnvVars.FROM_EMAIL,
  fromName: optionalEnvVars.FROM_NAME,
};
