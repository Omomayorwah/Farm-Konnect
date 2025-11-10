const express = require('express');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Message = require('../models/Message');
const Transaction = require('../models/Transaction');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ type: { $ne: 'admin' } })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private (Admin)
router.put('/users/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.json({
      message: 'User status updated successfully',
      user: {
        id: user._id,
        email: user.email,
        type: user.type,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/listings
// @desc    Get all listings
// @access  Private (Admin)
router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate('ownerId', 'email profile')
      .sort({ createdAt: -1 });

    res.json({ listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/listings/:id/status
// @desc    Update listing status
// @access  Private (Admin)
router.put('/listings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected', 'rented'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listing.status = status;
    await listing.save();

    res.json({
      message: 'Listing status updated successfully',
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private (Admin)
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ type: { $ne: 'admin' } });
    const pendingUsers = await User.countDocuments({ status: 'pending', type: { $ne: 'admin' } });
    const approvedUsers = await User.countDocuments({ status: 'approved', type: { $ne: 'admin' } });
    
    const totalListings = await Listing.countDocuments();
    const pendingListings = await Listing.countDocuments({ status: 'pending' });
    const approvedListings = await Listing.countDocuments({ status: 'approved' });
    
    const totalMessages = await Message.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    const farmers = await User.countDocuments({ type: 'farmer' });
    const landowners = await User.countDocuments({ type: 'landowner' });

    res.json({
      stats: {
        users: {
          total: totalUsers,
          pending: pendingUsers,
          approved: approvedUsers,
          farmers,
          landowners,
        },
        listings: {
          total: totalListings,
          pending: pendingListings,
          approved: approvedListings,
        },
        messages: {
          total: totalMessages,
        },
        transactions: {
          total: totalTransactions,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

