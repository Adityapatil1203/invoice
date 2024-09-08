const Invoice = require('../models/invoiceModel.js');
const pdfService = require('../services/pdfService');
const numberToWords = require('number-to-words');

exports.createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
//   console.log(invoiceData);
    // Compute tax and total amounts
    invoiceData.items.forEach(item => {
      item.netAmount = item.unitPrice * item.quantity - item.discount;
      if (invoiceData.placeOfSupply === invoiceData.placeOfDelivery) {
        item.taxRate = 18;
      } else {
        item.taxRate = 18; // IGST
      }
      item.taxAmount = (item.netAmount * item.taxRate) / 100;
    });

    // Calculate total amount
    const totalAmount = invoiceData.items.reduce((acc, item) => acc + item.netAmount + item.taxAmount, 0);
    invoiceData.totalAmount = totalAmount;
    invoiceData.amountInWords = convertNumberToWords(totalAmount); // Implement this function to convert number to words

    // Save invoice to database
    const newInvoice = new Invoice(invoiceData);
    await newInvoice.save();

    // Generate PDF using the PDF service
    pdfService.generateInvoicePDF(invoiceData, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send({ message: 'Invoice generated successfully', pdfUrl: result.filename });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to convert total amount to words (you can use any npm package for this)
const convertNumberToWords = (amount) => {
    // Convert the number to words
    const words = numberToWords.toWords(amount);
    
    // Return the result with "only" added at the end
    return words.charAt(0).toUpperCase() + words.slice(1) + ' only';
  };
