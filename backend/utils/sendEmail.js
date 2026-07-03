// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',
      pass: 'your-app-password', // Use Gmail App Password
    },
  });

  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
