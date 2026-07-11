const env = require('./env');

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const getTimestamp = () => new Date().toISOString();

const logger = {
  error: (message, error = null) => {
    const log = {
      timestamp: getTimestamp(),
      level: 'error',
      message,
      ...(error && { error: error.message, stack: error.stack }),
    };
    console.error(JSON.stringify(log));
  },

  warn: (message) => {
    console.warn(JSON.stringify({
      timestamp: getTimestamp(),
      level: 'warn',
      message,
    }));
  },

  info: (message) => {
    if (env.env === 'development' || env.env === 'test') {
      console.log(JSON.stringify({
        timestamp: getTimestamp(),
        level: 'info',
        message,
      }));
    }
  },

  debug: (message, data = null) => {
    if (env.env === 'development') {
      console.debug(JSON.stringify({
        timestamp: getTimestamp(),
        level: 'debug',
        message,
        ...(data && { data }),
      }));
    }
  },
};

module.exports = logger;
