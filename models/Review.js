const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  petId: { type: String, required: true },
  uid: { type: String, required: true },    // เพิ่ม uid สำหรับ match detail
  petName: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);