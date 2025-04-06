const Trip = require('../models/tripModel');
const { validationResult } = require('express-validator');

// Create a new trip
exports.createTrip = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, startDate, endDate, budget } = req.body;
    // Now req.user is guaranteed to exist because of dummyAuth
    const trip = await Trip.create({ userId: req.user.id, title, startDate, endDate, budget });
    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

// Get all trips
exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// Get a single trip by ID
exports.getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// Update trip
exports.updateTrip = async (req, res, next) => {
  try {
    const { title, startDate, endDate, budget } = req.body;
    const trip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      { title, startDate, endDate, budget },
      { new: true, runValidators: true }
    );
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// Delete trip
exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    next(error);
  }
};
