// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewId: { type: String, required: true, unique: true },
  petId: { type: String, required: true },
  uid: { type: String, required: true },
  petName: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);