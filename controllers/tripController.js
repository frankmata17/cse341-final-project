const Trip = require('../models/tripModel');
const { validationResult } = require('express-validator');

// Create a new trip
exports.createTrip = async (req, res, next) => {
  try {
    // Validate incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract all required and additional fields from the request body
    const { title, startDate, endDate, budget, description, itinerary, tripType } = req.body;

    // Ensure that the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authorized. Please log in via GitHub.' });
    }
    
    // Create a new trip document including additional fields.
    const trip = await Trip.create({
      userId: req.user.id,
      title,
      startDate,
      endDate,
      budget,
      description,   // optional field
      itinerary,     // optional field
      tripType       // optional field
    });
    
    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

// Get all trips
exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

// Get a single trip by ID
exports.getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

// Update trip (only updating the basic fields; you may modify it to update additional fields if desired)
exports.updateTrip = async (req, res, next) => {
  try {
    // Extract basic fields from request body; add additional fields if you want to enable updating them.
    const { title, startDate, endDate, budget, description, itinerary, tripType } = req.body;
    
    // Create an object with the fields to update. You can include additional fields as needed.
    const updateFields = { title, startDate, endDate, budget };
    if (description !== undefined) updateFields.description = description;
    if (itinerary !== undefined) updateFields.itinerary = itinerary;
    if (tripType !== undefined) updateFields.tripType = tripType;

    const trip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      updateFields,
      { new: true, runValidators: true }
    );
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

// Delete trip
exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Trip deleted' });
  } catch (error) {
    next(error);
  }
};
