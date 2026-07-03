// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require("./routes/userRouter");
const LotTravellerRouter = require('./routes/LotTravellerRouter') ;
const BoxLabelRouter = require('./routes/BoxLabelRouter') ;
const InspectionRouter = require('./routes/InspectionRouter') ;
const cookieParser = require('cookie-parser');
const path =  require('path') ;
const port = 3000;
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const db = require("./config/MongooseConnect") ;

const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({extended : true})) ;
app.use(cookieParser()) ;
app.use('/api/auth', authRoutes);

app.use('/api', userRouter);
app.use('/api', LotTravellerRouter);
app.use('/api', BoxLabelRouter);
app.use('/api', InspectionRouter);


app.get('/',(req,res)=>{
  res.send("heyy kaise hoo") ;
})



app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});








