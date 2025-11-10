const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.profile = {
        ...user.profile,
        ...req.body,
      };
      const updatedUser = await user.save();

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          email: updatedUser.email,
          type: updatedUser.type,
          status: updatedUser.status,
          profile: updatedUser.profile,
        },
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/:userId
// @desc    Get user by ID
// @access  Private
router.get('/:userId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        type: user.type,
        status: user.status,
        profile: user.profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

