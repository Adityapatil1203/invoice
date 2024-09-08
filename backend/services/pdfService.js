const pdf = require('html-pdf');
const fs = require('fs');

// Function to generate the HTML content for the invoice
const generateInvoiceHTML = (invoiceData) => {
  return `
    <html>
    <head>
      <style>
        /* Style your invoice here */
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
      </style>
    </head>
    <body>
      <h1>Invoice</h1>
      <p>Seller: ${invoiceData.seller.name}</p>
      <p>Billing Address: ${invoiceData.billing.name}</p>
      <p>Order No: ${invoiceData.order.orderNo}</p>
      <p>Invoice No: ${invoiceData.invoice.invoiceNo}</p>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>Net Amount</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>${item.unitPrice}</td>
              <td>${item.discount}</td>
              <td>${item.netAmount}</td>
              <td>${item.taxAmount}</td>
              <td>${item.netAmount + item.taxAmount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p>Total Amount: ${invoiceData.totalAmount}</p>
      <p>Amount in Words: ${invoiceData.amountInWords}</p>
    </body>
    </html>
  `;
};

// Function to generate the PDF and save it to a file
exports.generateInvoicePDF = (invoiceData, callback) => {
  const html = generateInvoiceHTML(invoiceData);
  const options = { format: 'A4' };

  pdf.create(html, options).toFile('./invoices/invoice.pdf', (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};
