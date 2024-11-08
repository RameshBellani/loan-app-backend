// routes/repaymentRoutes.js
const express = require('express');
const { submitRepayment } = require('../controllers/repaymentController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/:loanId/repayments', auth(['customer']), submitRepayment);




module.exports = router;
