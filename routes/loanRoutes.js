// backend/routes/loanRoutes.js
const express = require('express');
const Loan = require('../models/Loan'); // Import Loan model
const { applyForLoan, getLoansForCustomer, approveLoan } = require('../controllers/loanController');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/admin'); // Import your isAdmin middleware
const router = express.Router();

// Customer routes
router.post('/apply', auth(['customer']), applyForLoan); 
router.get('/', auth(['customer']), getLoansForCustomer); 

// Admin routes
router.get('/all', auth(['admin']), async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans' });
  }
});

  
router.patch('/approve/:id', isAdmin, approveLoan); // Admin can approve loan
  

 

module.exports = router; // Export the router
