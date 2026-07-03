// controllers/authController.js
const transporter = require('../config/nodemailer');

const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // You can also store OTP in DB or memory if needed
  console.log('Generated OTP:', otp);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

module.exports = { sendOTP };
