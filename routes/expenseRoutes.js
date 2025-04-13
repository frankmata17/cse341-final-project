const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const expenseController = require('../controllers/expenseController');
const { ensureAuthenticated } = require('../middlewares/oauthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management
 */

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - githubOAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - date
 *               - amount
 *     responses:
 *       201:
 *         description: Expense created successfully.
 *       400:
 *         description: Bad request.
 */
router.post(
  '/',
  ensureAuthenticated,
  [
    // Removed: check('tripId', 'Trip ID is required').notEmpty(),
    check('date', 'Expense date is required').notEmpty(),
    check('amount', 'Amount is required and must be a number').isNumeric(),
  ],
  expenseController.createExpense
);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Retrieve all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: List of expenses.
 */
router.get('/', expenseController.getExpenses);

/**
 * @swagger
 * /expenses/{expenseId}:
 *   get:
 *     summary: Retrieve an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense found.
 *       404:
 *         description: Expense not found.
 */
router.get('/:expenseId', expenseController.getExpenseById);

/**
 * @swagger
 * /expenses/{expenseId}:
 *   put:
 *     summary: Update an existing expense
 *     tags: [Expenses]
 *     security:
 *       - googleOAuth: []
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated successfully.
 *       404:
 *         description: Expense not found.
 */
router.put('/:expenseId', ensureAuthenticated, expenseController.updateExpense);

/**
 * @swagger
 * /expenses/{expenseId}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully.
 *       404:
 *         description: Expense not found.
 */
router.delete('/:expenseId', expenseController.deleteExpense);

module.exports = router;
