const Expense = require('../models/expenseModel');
const { validationResult } = require('express-validator');

// Create a new expense
exports.createExpense = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    const { tripId, date, amount, category, description } = req.body;
    const expense = await Expense.create({ tripId, date, amount, category, description });
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

// Get all expenses
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

// Get expense by ID
exports.getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

// Update expense
exports.updateExpense = async (req, res, next) => {
  try {
    const { date, amount, category, description } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      req.params.expenseId,
      { date, amount, category, description },
      { new: true, runValidators: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

// Delete expense
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.expenseId);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    next(error);
  }
};
