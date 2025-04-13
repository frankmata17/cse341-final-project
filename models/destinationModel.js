const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  tripId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip', 
    default: () => new mongoose.Types.ObjectId()
  },
  name: {
    type: String,
    required: [true, 'Destination name is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
