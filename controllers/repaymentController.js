const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment'); // Ensure Repayment is imported if it's necessary for validation

exports.submitRepayment = async (req, res) => {
  console.log('Authenticated user:', req.user);  // Log req.user to verify it

  try {
    const { amount, repaymentIndex } = req.body;  // Get repayment amount and repaymentIndex from request body
    const { loanId } = req.params;  // Get loanId from URL parameters

    // Step 1: Find the loan by its ID
    const loan = await Loan.findById(loanId);
    
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Step 2: Ensure the loan belongs to the authenticated user
    if (loan.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    // Step 3: Ensure repaymentIndex is valid
    const repayment = loan.repayments[repaymentIndex];

    if (!repayment) {
      return res.status(404).json({ message: 'Repayment not found' });
    }

    // Step 4: Ensure repayment is still pending
    if (repayment.status === 'PAID') {
      return res.status(400).json({ message: 'This repayment has already been paid' });
    }

    // Step 5: Ensure the repayment amount is correct
    if (amount < repayment.amount) {
      return res.status(400).json({ message: 'Amount must be greater than or equal to scheduled amount' });
    }

    // Step 6: Update repayment status to 'PAID'
    repayment.status = 'PAID';
    await loan.save();  // Save the updated loan with the paid repayment

    // Step 7: If all repayments are paid, update the loan status to 'PAID'
    if (loan.repayments.every(rep => rep.status === 'PAID')) {
      loan.status = 'PAID';
      await loan.save();  // Save the updated loan status
    }

    // Step 8: Respond with success message
    res.json({
      message: 'Repayment successfully submitted.',
      loan: {
        status: loan.status,
        repayments: loan.repayments,
      },
    });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};
