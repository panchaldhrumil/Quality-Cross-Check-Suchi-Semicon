// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require("./routes/userRouter");
const LotTravellerRouter = require('./routes/LotTravellerRouter');
const BoxLabelRouter = require('./routes/BoxLabelRouter');
const InspectionRouter = require('./routes/InspectionRouter');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const db = require("./config/MongooseConnect");

const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.use('/api', userRouter);
app.use('/api', LotTravellerRouter);
app.use('/api', BoxLabelRouter);
app.use('/api', InspectionRouter);

app.get('/', (req, res) => {
  res.send("heyy kaise hoo");
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
