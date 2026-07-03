// config/nodemailer.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // to load .env vars

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER ,     // your Gmail
    pass: process.env.EMAIL_PASS ,     // your App Password
  },
});

// Optional: Verify the connection config
transporter.verify(function (error, success) {
  if (error) {
    console.log('Nodemailer Error:', error);
  } else {
    console.log('Nodemailer is ready to send emails!');
  }
});

module.exports = transporter;
