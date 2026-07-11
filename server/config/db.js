const mongoose = require('mongoose');
const logger = require('./logger');

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const connectDB = async () => {
  let retries = 0;

  const attemptConnection = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      retries++;
      logger.error(`MongoDB connection attempt ${retries} failed`, error);

      if (retries >= MAX_RETRIES) {
        logger.error('Max MongoDB connection retries reached. Exiting...');
        process.exit(1);
      }

      logger.warn(`Retrying MongoDB connection in ${RETRY_DELAY / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return attemptConnection();
    }
  };

  const conn = await attemptConnection();

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Attempting to reconnect...');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error', err);
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected');
  });

  return conn;
};

module.exports = connectDB;
