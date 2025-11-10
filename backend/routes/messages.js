const express = require('express');
const Message = require('../models/Message');
const Listing = require('../models/Listing');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/messages
// @desc    Send a message
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { listingId, toId, content } = req.body;

    if (!listingId || !toId || !content) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const message = await Message.create({
      listingId,
      fromId: req.user._id,
      toId,
      fromName: req.user.profile.fullName || req.user.email,
      content,
    });

    res.status(201).json({
      message: 'Message sent successfully',
      message: message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/messages/listing/:id
// @desc    Get messages for a listing
// @access  Private
router.get('/listing/:id', protect, async (req, res) => {
  try {
    const messages = await Message.find({ listingId: req.params.id })
      .populate('fromId', 'email profile')
      .populate('toId', 'email profile')
      .sort({ timestamp: 1 });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/messages/my/all
// @desc    Get all user messages
// @access  Private
router.get('/my/all', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { fromId: req.user._id },
        { toId: req.user._id },
      ],
    })
      .populate('listingId', 'title')
      .populate('fromId', 'email profile')
      .populate('toId', 'email profile')
      .sort({ timestamp: -1 });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/messages/:id/read
// @desc    Mark message as read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.toId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    message.read = true;
    await message.save();

    res.json({ message: 'Message marked as read', message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

