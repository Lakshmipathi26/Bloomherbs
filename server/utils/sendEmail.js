const nodemailer = require('nodemailer');
const logger = require('./logger');

const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    logger.warn('SMTP credentials not configured. Email sending will fail.');
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: parseInt(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  transporter.verify((err) => {
    if (err) {
      logger.error('SMTP connection verification failed', err);
    } else {
      logger.info('✅ SMTP transporter verified');
    }
  });

  return transporter;
};

const transporter = createTransporter();

const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) {
    throw new Error('SMTP transporter not configured');
  }

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'BloomHerbs'}" <${process.env.FROM_EMAIL || process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Failed to send email to ${to}`, error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = sendEmail;
