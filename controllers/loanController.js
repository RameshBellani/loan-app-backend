// controllers/loanController.js
const Loan = require('../models/Loan');

// Customer applies for a loan
exports.applyForLoan = async (req, res) => {
  try {
    const { amount, term } = req.body;
    
    // Validate the input
    if (!amount || !term || amount <= 0 || term <= 0) {
      return res.status(400).json({ message: 'Invalid loan details' });
    }
    
    // Calculate weekly repayment amount
    const weeklyAmount = (amount / term).toFixed(2);
    
    // Generate repayment schedule
    const repayments = Array.from({ length: term }, (_, i) => ({
      dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000), // Due dates every week
      amount: weeklyAmount,
      status: 'PENDING', // Initial status of each repayment
    }));

    // Create loan
    const loan = await Loan.create({
      amount,
      term,
      repayments,
      customer: req.user._id, // Link the loan to the authenticated customer
      status: 'PENDING', // Initial status of loan
    });
    
    res.status(201).json(loan); // Return the created loan
  } catch (error) {
    res.status(500).json({ message: error.message }); // Error handling
  }
};

// Get loans for the authenticated customer
exports.getLoansForCustomer = async (req, res) => {
  try {
    // Find loans where the 'customer' matches the authenticated user
    const loans = await Loan.find({ customer: req.user._id });
    res.status(200).json(loans); // Return the loans to the customer
  } catch (error) {
    res.status(500).json({ message: error.message }); // Error handling
  }
};

// Admin approves a loan
exports.approveLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id); // Find the loan by ID

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' }); // If loan not found, return error
    }

    if (loan.status === 'APPROVED') {
      return res.status(400).json({ message: 'Loan is already approved' }); // If already approved, return error
    }

    // Update the loan status to APPROVED
    loan.status = 'APPROVED';
    await loan.save(); // Save the updated loan

    res.status(200).json({ message: 'Loan approved successfully', loan }); // Return success message
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Error handling
  }
};
