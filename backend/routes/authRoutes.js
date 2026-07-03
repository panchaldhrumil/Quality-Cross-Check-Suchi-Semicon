const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controllers/authcontroller');

router.post('/auth/send-otp', sendOTP);

module.exports = router;
