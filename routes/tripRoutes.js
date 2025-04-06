const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const tripController = require('../controllers/tripController');

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management
 */

/**
 * @swagger
 * /trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               budget:
 *                 type: number
 *             required:
 *               - title
 *               - startDate
 *               - endDate
 *               - budget
 *     responses:
 *       201:
 *         description: The trip was successfully created.
 *       400:
 *         description: Bad request.
 */
router.post(
  '/',
  [
    check('title', 'Title is required').notEmpty(),
    check('startDate', 'Start date is required').notEmpty(),
    check('endDate', 'End date is required').notEmpty(),
    check('budget', 'Budget is required and must be a number').isNumeric(),
  ],
  tripController.createTrip
);

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Retrieve a list of trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: A list of trips.
 */
router.get('/', tripController.getTrips);

/**
 * @swagger
 * /trips/{tripId}:
 *   get:
 *     summary: Get a trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: The trip id.
 *     responses:
 *       200:
 *         description: Trip found.
 *       404:
 *         description: Trip not found.
 */
router.get('/:tripId', tripController.getTripById);

/**
 * @swagger
 * /trips/{tripId}:
 *   put:
 *     summary: Update a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: The trip id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               budget:
 *                 type: number
 *     responses:
 *       200:
 *         description: Trip updated.
 *       404:
 *         description: Trip not found.
 */
router.put('/:tripId', tripController.updateTrip);

/**
 * @swagger
 * /trips/{tripId}:
 *   delete:
 *     summary: Delete a trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: The trip id.
 *     responses:
 *       200:
 *         description: Trip deleted.
 *       404:
 *         description: Trip not found.
 */
router.delete('/:tripId', tripController.deleteTrip);

module.exports = router;
