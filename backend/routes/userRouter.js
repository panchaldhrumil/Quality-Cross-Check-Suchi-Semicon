 const express = require('express') ;
 const router = express.Router() ;
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');
 const path =  require('path') ;
 const userModel = require('../models/user');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


// Request OTP
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.status(404).send('Email not found.');

  const otp = crypto.randomInt(100000, 999999).toString();

  user.resetOTP = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);

  res.status(200).send('OTP sent to your email.');
});


// Verify OTP & Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || user.resetOTP !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).send('Invalid or expired OTP.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetOTP = undefined;
  user.otpExpiry = undefined;

  await user.save();
  res.status(200).send('Password reset successful.');
});




 // Example endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({email }) ;
  console.log("User found:", user);
  if(!user) return res.status(500).send("your entered email does not exist, pls do Sign Up") ;

  bcrypt.compare(password , user.password , function(err,result){
    if(result){
      let token = jwt.sign({email: email} , "shhhhh") ;
       res.cookie("token",token) ;
       res.status(200).send("now you are logged in") ;
    }
  })
});


router.post("/register" , async (req,res)=>{
  let {name , email , password} = req.body ;

  let user = await userModel.findOne({email}) ;
  if (user) return res.status(500).send("you have successfully registered") ;

  bcrypt.genSalt(10,(err , salt)=>{
    bcrypt.hash(password, salt ,async (err,hash)=>{
         let user = await userModel.create({
          name : name ,
          email : email ,
          password : hash
         }) ;
         let token = jwt.sign({email: email} , "shhhhh") ;
           res.cookie("token",token) ;
       res.status(200).send("registered") ;

    })
  })
})
 
 module.exports = router ;