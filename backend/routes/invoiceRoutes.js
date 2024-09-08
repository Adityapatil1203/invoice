const express = require('express');
const { createInvoice } = require('../controllers/invoiceController.js');
const router = express.Router();

// Route to create a new invoice
router.post('/', createInvoice);
router.get('/test', (req, res) => {
    res.send('API is working');
  });
  

module.exports = router;
