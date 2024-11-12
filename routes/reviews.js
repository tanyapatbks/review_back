// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create Review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review({
      reviewId: req.body.reviewId, // ใช้ค่าจาก req.body.reviewId
      ...req.body,
      createdAt: new Date()
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View All Reviews (for a specific pet)
router.get('/:petId', async (req, res) => {
  try {
    console.log('Getting reviews for petId:', req.params.petId);
    const reviews = await Review.find({ petId: req.params.petId });
    console.log('Found reviews:', reviews);
    res.json(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ message: error.message });
  }
});

// View Reviews for Match Detail
router.get('/:petId/:uid', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      petId: req.params.petId,
      uid: req.params.uid 
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit Review
router.put('/:reviewId', async (req, res) => { // ใช้ reviewId ในการค้นหา
  try {
    const { content } = req.body;
    const updatedReview = await Review.findOneAndUpdate(
      { reviewId: req.params.reviewId }, // ค้นหาด้วย reviewId
      { content },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Review
router.delete('/:reviewId', async (req, res) => { // ใช้ reviewId ในการค้นหา
  try {
    const deletedReview = await Review.findOneAndDelete({ 
      reviewId: req.params.reviewId // ค้นหาด้วย reviewId
    });
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;