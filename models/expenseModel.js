const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  tripId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip', 
    default: () => new mongoose.Types.ObjectId()
  },
  date: {
    type: Date,
    required: [true, 'Expense date is required']
  },
  amount: {
    type: Number,
    required: [true, 'Expense amount is required']
  },
  category: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
