const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // เพิ่มการกำหนด origin
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/reviews', reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));