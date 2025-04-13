const Destination = require('../models/destinationModel');
const { validationResult } = require('express-validator');

// Create a new destination
exports.createDestination = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    const { tripId, name, location, startDate, endDate, notes } = req.body;
    const destination = await Destination.create({ tripId, name, location, startDate, endDate, notes });
    res.status(201).json(destination);
  } catch (error) {
    next(error);
  }
};

// Get all destinations (optionally filtered by tripId)
exports.getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    next(error);
  }
};

// Get destination by ID
exports.getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.destinationId);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    next(error);
  }
};

// Update destination
exports.updateDestination = async (req, res, next) => {
  try {
    const { name, location, startDate, endDate, notes } = req.body;
    const destination = await Destination.findByIdAndUpdate(
      req.params.destinationId,
      { name, location, startDate, endDate, notes },
      { new: true, runValidators: true }
    );
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    next(error);
  }
};

// Delete destination
exports.deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.destinationId);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Destination deleted' });
  } catch (error) {
    next(error);
  }
};
