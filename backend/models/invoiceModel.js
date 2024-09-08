const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  seller: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    pan: String,
    gst: String,
  },
  billing: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    stateCode: String,
  },
  shipping: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    stateCode: String,
  },
  placeOfSupply: String,
  placeOfDelivery: String,
  order: {
    orderNo: String,
    orderDate: Date,
  },
  invoice: {
    invoiceNo: String,
    invoiceDate: Date,
    reverseCharge: Boolean,
  },
  items: [
    {
      description: String,
      unitPrice: Number,
      quantity: Number,
      discount: Number,
      netAmount: Number,
      taxRate: Number,
      taxAmount: Number,
    },
  ],
  totalAmount: Number,
  amountInWords: String,
  signature: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
