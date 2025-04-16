const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a trip title'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date'],
  },
  budget: {
    type: Number,
    required: [true, 'Please add a budget'],
  },
  description: {
    type: String,
    default: '',
    description: 'A brief description of the trip'
  },
  itinerary: {
    type: String,
    default: '',
    description: 'Summary of the planned itinerary for the trip'
  },
  tripType: {
    type: String,
    enum: ['vacation', 'business', 'adventure', 'other'],
    default: 'other',
    description: 'Type of the trip'
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
