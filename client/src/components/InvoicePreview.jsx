import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const InvoicePreview = ({ formData }) => {
  const printRef = useRef();

  // Function to generate PDF
  const generatePDF = async () => {
    const element = printRef.current; // Ref to the HTML content
    const canvas = await html2canvas(element); // Convert HTML to canvas
    const data = canvas.toDataURL('image/png'); // Convert canvas to image
    const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF
    const imgProperties = pdf.getImageProperties(data); // Get image properties
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf'); // Save the PDF with a filename
  };

  return (
    <div>
      <h2>Invoice Preview</h2>

      {/* This div will be converted to PDF */}
      <div ref={printRef} style={{ padding: '10px', backgroundColor: '#fff' }}>
        <h3>Seller Details</h3>
        <p><strong>Name:</strong> {formData.seller.name}</p>
        <p><strong>Address:</strong> {formData.seller.address}</p>
        <p><strong>City:</strong> {formData.seller.city}, {formData.seller.state} - {formData.seller.pincode}</p>
        <p><strong>PAN:</strong> {formData.seller.pan}</p>
        <p><strong>GST No.:</strong> {formData.seller.gst}</p>

        <h3>Billing Details</h3>
        <p><strong>Name:</strong> {formData.billing.name}</p>
        <p><strong>Address:</strong> {formData.billing.address}</p>
        <p><strong>City:</strong> {formData.billing.city}, {formData.billing.state} - {formData.billing.pincode}</p>
        <p><strong>State Code:</strong> {formData.billing.stateCode}</p>

        <h3>Item Details</h3>
        {formData.items.map((item, index) => (
          <div key={index}>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Unit Price:</strong> {item.unitPrice}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Discount:</strong> {item.discount}</p>
          </div>
        ))}
      </div>

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default InvoicePreview;
