const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const destinationController = require('../controllers/destinationController');
const { ensureAuthenticated } = require('../middlewares/oauthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Destinations
 *   description: Destination management
 */

/**
 * @swagger
 * tags:
 *   name: Destinations
 *   description: Destination management
 */

/**
 * @swagger
 * /destinations:
 *   post:
 *     summary: Create a new destination
 *     tags: [Destinations]
 *     security:
 *       - githubOAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *             required:
 *               - name
 *               - location
 *               - startDate
 *               - endDate
 *     responses:
 *       201:
 *         description: Destination created successfully.
 *       400:
 *         description: Bad request.
 */
router.post(
  '/',
  ensureAuthenticated,
  [
    // Removed: check('tripId', 'Trip ID is required').notEmpty(),
    check('name', 'Destination name is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    check('startDate', 'Start date is required').notEmpty(),
    check('endDate', 'End date is required').notEmpty()
  ],
  destinationController.createDestination
);

/**
 * @swagger
 * /destinations:
 *   get:
 *     summary: Retrieve all destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: A list of destinations.
 */
router.get('/', destinationController.getDestinations);

/**
 * @swagger
 * /destinations/{destinationId}:
 *   get:
 *     summary: Retrieve a destination by ID
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: destinationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The destination ID.
 *     responses:
 *       200:
 *         description: Destination found.
 *       404:
 *         description: Destination not found.
 */
router.get('/:destinationId', destinationController.getDestinationById);

/**
 * @swagger
 * /destinations/{destinationId}:
 *   put:
 *     summary: Update an existing destination
 *     tags: [Destinations]
 *     security:
 *       - githubOAuth: []
 *     parameters:
 *       - in: path
 *         name: destinationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The destination ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Destination updated successfully.
 *       404:
 *         description: Destination not found.
 */
router.put('/:destinationId', ensureAuthenticated, destinationController.updateDestination);

/**
 * @swagger
 * /destinations/{destinationId}:
 *   delete:
 *     summary: Delete a destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: destinationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The destination ID.
 *     responses:
 *       200:
 *         description: Destination deleted successfully.
 *       404:
 *         description: Destination not found.
 */
router.delete('/:destinationId', destinationController.deleteDestination);

module.exports = router;
