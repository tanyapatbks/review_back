const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));