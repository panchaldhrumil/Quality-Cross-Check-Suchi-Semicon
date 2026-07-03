const mongoose = require('mongoose') ;


const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  resetOTP: String,
  otpExpiry: Date
});


module.exports = mongoose.model("user",userSchema)


