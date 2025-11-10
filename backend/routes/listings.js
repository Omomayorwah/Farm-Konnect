const express = require('express');
const Listing = require('../models/Listing');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

const router = express.Router();

// @route   POST /api/listings
// @desc    Create a new listing
// @access  Private (Landowner)
router.post('/', protect, authorize('landowner'), upload.array('photos', 5), async (req, res) => {
  try {
    const listingData = {
      ...req.body,
      ownerId: req.user._id,
      ownerName: req.user.profile.fullName || req.user.email,
    };

    // Handle uploaded photos
    if (req.files && req.files.length > 0) {
      listingData.photos = req.files.map(file => `/uploads/${file.filename}`);
    }

    const listing = await Listing.create(listingData);

    res.status(201).json({
      message: 'Listing created successfully',
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/listings
// @desc    Get all approved listings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const listings = await Listing.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .populate('ownerId', 'email profile');

    res.json({ listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/listings/:id
// @desc    Get listing by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('ownerId', 'email profile status');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Increment views
    listing.views += 1;
    await listing.save();

    res.json({ listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/listings/my/all
// @desc    Get user's listings
// @access  Private (Landowner)
router.get('/my/all', protect, authorize('landowner'), async (req, res) => {
  try {
    const listings = await Listing.find({ ownerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/listings/:id
// @desc    Update listing
// @access  Private (Owner)
router.put('/:id', protect, authorize('landowner'), upload.array('photos', 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    // Update listing data
    Object.assign(listing, req.body);

    // Handle new photos
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => `/uploads/${file.filename}`);
      listing.photos = [...listing.photos, ...newPhotos];
    }

    const updatedListing = await listing.save();

    res.json({
      message: 'Listing updated successfully',
      listing: updatedListing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/listings/:id
// @desc    Delete listing
// @access  Private (Owner)
router.delete('/:id', protect, authorize('landowner'), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await listing.remove();

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

