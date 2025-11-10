const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  landType: {
    type: String,
    enum: ['arable', 'pasture', 'orchard', 'mixed'],
    required: true,
  },
  acreage: {
    type: Number,
    required: [true, 'Please provide acreage'],
    min: 0,
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'Please provide a state'],
    trim: true,
  },
  features: {
    type: [String],
    default: [],
  },
  leaseDuration: {
    type: Number,
    required: [true, 'Please provide lease duration in months'],
    min: 1,
  },
  rentPrice: {
    type: Number,
    required: [true, 'Please provide rent price'],
    min: 0,
  },
  description: {
    type: String,
    default: '',
  },
  photos: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'rented'],
    default: 'pending',
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Listing', listingSchema);

