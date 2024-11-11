const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create Review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review({
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
    const reviews = await Review.find({ 
      petId: req.params.petId 
    }).sort({ createdAt: -1 }); // เรียงตามวันที่ล่าสุด
    res.json(reviews);
  } catch (error) {
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
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body; // อนุญาตให้แก้ไขแค่ content เท่านั้น
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
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
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;