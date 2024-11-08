//models/Loan.js

const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  repayments: [
    {
      dueDate: { type: Date },
      amount: { type: Number },
      status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
    }
  ],
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Loan', loanSchema);
