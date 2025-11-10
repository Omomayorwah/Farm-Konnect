const express = require('express');
const Transaction = require('../models/Transaction');
const Listing = require('../models/Listing');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/transactions
// @desc    Create a transaction
// @access  Private (Admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { listingId, landowner, farmer, totalAmount, platformFee, paymentDetails } = req.body;

    if (!listingId || !landowner || !farmer || !totalAmount) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const transaction = await Transaction.create({
      listingId,
      landowner,
      farmer,
      totalAmount,
      platformFee: platformFee || 0,
      paymentDetails: paymentDetails || {},
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/transactions/:id
// @desc    Get transaction by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('listingId', 'title')
      .populate('landowner', 'email profile')
      .populate('farmer', 'email profile');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if user is authorized to view this transaction
    if (
      req.user.type !== 'admin' &&
      transaction.landowner.toString() !== req.user._id.toString() &&
      transaction.farmer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this transaction' });
    }

    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

