// import React from 'react';
// import './InvoiceTemplate.css'; // External CSS file for styling

// const InvoiceTemplate = ({
//   sellerDetails,
//   billingDetails,
//   shippingDetails,
//   orderDetails,
//   invoiceDetails,
//   items,
//   totalAmountInWords,
//   logo,
//   signature
// }) => {
//   return (
//     <div id="invoice-template" className="invoice-container">
//       {/* Invoice Header with Logo */}
//       <div className="invoice-header">
//         {logo && <img src={URL.createObjectURL(logo)} alt="Company Logo" className="invoice-logo" />}
//         <h2>Tax Invoice/Bill of Supply/Cash Memo</h2>
//         <h3>(Original for Recipient)</h3>
//       </div>

//       {/* Seller, Billing, Shipping, and Order Details */}
//       <div className="invoice-section">
//         <div className="seller-details">
//           <h4>Sold By :</h4>
//           <p>{sellerDetails?.name}</p>
//           <p>{sellerDetails?.address}</p>
//           <p>PAN No: {sellerDetails?.pan}</p>
//           <p>GST Registration No: {sellerDetails?.gst}</p>
//         </div>

//         <div className="billing-details">
//           <h4>Billing Address :</h4>
//           <p>{billingDetails?.name}</p>
//           <p>{billingDetails?.address}</p>
//           <p>{billingDetails?.city}, {billingDetails?.state}, {billingDetails?.pincode}</p>
//           <p>State/UT Code: {billingDetails?.stateCode}</p>
//         </div>

//         <div className="shipping-details">
//           <h4>Shipping Address :</h4>
//           <p>{shippingDetails?.name}</p>
//           <p>{shippingDetails?.address}</p>
//           <p>{shippingDetails?.city}, {shippingDetails?.state}, {shippingDetails?.pincode}</p>
//           <p>State/UT Code: {shippingDetails?.stateCode}</p>
//         </div>
//       </div>

//       <div className="order-details">
//         <p>Order Number: {orderDetails?.orderNo}</p>
//         <p>Order Date: {orderDetails?.orderDate}</p>
//         <p>Invoice Number: {invoiceDetails?.invoiceNo}</p>
//         <p>Invoice Date: {invoiceDetails?.invoiceDate}</p>
//       </div>

//       {/* Item Table */}
//       <table className="invoice-table">
//         <thead>
//           <tr>
//             <th>SL</th>
//             <th>Description</th>
//             <th>Qty</th>
//             <th>Unit</th>
//             <th>Price</th>
//             <th>Discount</th>
//             <th>Net</th>
//             <th>Tax</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           { items?.length>0 && items.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item?.description}</td>
//               <td>{item?.quantity}</td>
//               <td>{item?.unitPrice}</td>
//               <td>₹{item?.unitPrice}</td>
//               <td>₹{item?.discount}</td>
//               <td>₹{item?.unitPrice * item?.quantity - item?.discount}</td>
//               <td>CGST: ₹{item?.tax?.CGST} | SGST: ₹{item?.tax?.SGST}</td>
//               <td>₹{item?.totalAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Total Amount and Signature */}
//       <div className="total-section">
//         <p>Amount in Words: {totalAmountInWords}</p>
//         <div className="signature-section">
//           <p>For {sellerDetails?.name}:</p>
//           {signature && <img src={URL.createObjectURL(signature)} alt="Authorized Signature" className="signature-image" />}
//           <p>Authorized Signatory</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="invoice-footer">
//         <p>Whether tax is payable under reverse charge - No</p>
//       </div>
//     </div>
//   );
// };

// export default InvoiceTemplate;


import React from 'react';
import './InvoiceTemplate.css'; // External CSS file for styling

const InvoiceTemplate = ({
  sellerDetails,
  billingDetails,
  shippingDetails,
  orderDetails,
  invoiceDetails,
  items,
  totalAmountInWords,
  logo,
  signature
}) => {

    const generatePdf = () => {
        const input = document.getElementById('invoice-template');
        
        html2canvas(input).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;
    
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
    
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
    
          pdf.save(`invoice_${invoiceDetails.invoiceNo}.pdf`);
        });
    }





  return (
    <div id="invoice-template" className="invoice-container">
      {/* Invoice Header with Logo */}
      <div className="invoice-header">
        {logo && <img src={URL.createObjectURL(logo)} alt="Company Logo" className="invoice-logo" />}
        <h2>Tax Invoice/Bill of Supply/Cash Memo</h2>
        <h3>(Original for Recipient)</h3>
      </div>

      {/* Seller, Billing, Shipping, and Order Details */}
      <div className="invoice-section">
        <div className="details-block seller-details">
          <h4>Sold By :</h4>
          <p>{sellerDetails?.name}</p>
          <p>{sellerDetails?.address}</p>
          <p>PAN No: {sellerDetails?.pan}</p>
          <p>GST Registration No: {sellerDetails?.gst}</p>
        </div>

        <div className="details-block billing-details">
          <h4>Billing Address :</h4>
          <p>{billingDetails?.name}</p>
          <p>{billingDetails?.address}</p>
          <p>{billingDetails?.city}, {billingDetails?.state}, {billingDetails?.pincode}</p>
          <p>State/UT Code: {billingDetails?.stateCode}</p>
        </div>

        <div className="details-block shipping-details">
          <h4>Shipping Address :</h4>
          <p>{shippingDetails?.name}</p>
          <p>{shippingDetails?.address}</p>
          <p>{shippingDetails?.city}, {shippingDetails?.state}, {shippingDetails?.pincode}</p>
          <p>State/UT Code: {shippingDetails?.stateCode}</p>
        </div>
      </div>

      <div className="order-details">
        <p><strong>Order Number:</strong> {orderDetails?.orderNo}</p>
        <p><strong>Order Date:</strong> {orderDetails?.orderDate}</p>
        <p><strong>Invoice Number:</strong> {invoiceDetails?.invoiceNo}</p>
        <p><strong>Invoice Date:</strong> {invoiceDetails?.invoiceDate}</p>
      </div>

      {/* Item Table */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Net</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.length > 0 && items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.description}</td>
              <td>{item?.quantity}</td>
              <td>₹{item?.unitPrice?.toFixed(2)}</td>
              <td>₹{item?.unitPrice?.toFixed(2)}</td>
              <td>₹{item?.discount?.toFixed(2)}</td>
              <td>₹{(item?.unitPrice * item?.quantity - item?.discount)?.toFixed(2)}</td>
              <td>CGST: ₹{item?.tax?.CGST.toFixed(2)} | SGST: ₹{item?.tax?.SGST?.toFixed(2)}</td>
              <td>₹{item?.totalAmount?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount and Signature */}
      <div className="total-section">
        <p><strong>Amount in Words:</strong> {totalAmountInWords}</p>
        <div className="signature-section">
          <p>For {sellerDetails?.name}:</p>
          {signature && <img src={URL.createObjectURL(signature)} alt="Authorized Signature" className="signature-image" />}
          <p>Authorized Signatory</p>
        </div>
      </div>

      {/* Footer */}
      <div className="invoice-footer">
        <p>Whether tax is payable under reverse charge - No</p>
      </div>

      <button onClick={generatePdf}>Download PDF</button>
    </div>
  );
};

export default InvoiceTemplate;
