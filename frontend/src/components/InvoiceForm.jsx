// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable'; // For generating tables in PDFs

// const InvoiceForm = () => {
//   const [sellerDetails, setSellerDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', pan: '', gst: '' });
//   const [billingDetails, setBillingDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', stateCode: '' });
//   const [shippingDetails, setShippingDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', stateCode: '' });
//   const [items, setItems] = useState([{ description: '', unitPrice: 0, quantity: 0, discount: 0 }]);
//   const [placeOfDelivery, setPlaceOfDelivery] = useState('');
//   const [reverseCharge, setReverseCharge] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({ orderNo: '', orderDate: '' });
//   const [invoiceDetails, setInvoiceDetails] = useState({ invoiceNo: '', invoiceDate: '' });
//   const [logo, setLogo] = useState(null);
//   const [signature, setSignature] = useState(null);

//   const handleAddItem = () => {
//     setItems([...items, { description: '', unitPrice: 0, quantity: 0, discount: 0 }]);
//   };

//   const handleRemoveItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const calculateNetAmount = (item) => {
//     return item.unitPrice * item.quantity - item.discount;
//   };

//   const calculateTaxAmount = (netAmount) => {
//     return {
//       CGST: (netAmount * 0.09), // 9%
//       SGST: (netAmount * 0.09), // 9%
//       IGST: netAmount * 0.18, // 18%
//     };
//   };

//   const calculateTotalAmount = (netAmount, taxAmount) => {
//     return netAmount + Object.values(taxAmount).reduce((sum, tax) => sum + tax, 0);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const itemsWithCalculations = items.map(item => {
//       const netAmount = calculateNetAmount(item);
//       const taxAmount = calculateTaxAmount(netAmount);
//       const totalAmount = calculateTotalAmount(netAmount, taxAmount);

//       return {
//         ...item,
//         netAmount,
//         taxAmount,
//         totalAmount,
//       };
//     });

//     // Now generate the PDF after calculation
//     generatePdf({
//       sellerDetails,
//       billingDetails,
//       shippingDetails,
//       orderDetails,
//       invoiceDetails,
//       items: itemsWithCalculations,
//       placeOfDelivery,
//       reverseCharge,
//     });
//   };

//   const generatePdf = (invoiceData) => {
//     const doc = new jsPDF();

//     // Add logo
//     if (logo) {
//       const reader = new FileReader();
//       reader.readAsDataURL(logo);
//       reader.onload = function () {
//         doc.addImage(reader.result, 'PNG', 10, 5, 50, 15); // Adjust positioning
//         generatePdfContent(doc, invoiceData);
//       };
//     } else {
//       generatePdfContent(doc, invoiceData);
//     }
//   };

//   const generatePdfContent = (doc, invoiceData) => {
//     // Seller details
//     doc.setFontSize(11);
//     doc.text('Sold By:', 10, 30);
//     doc.text(`${invoiceData.sellerDetails.name}`, 10, 35);
//     doc.text(`${invoiceData.sellerDetails.address}`, 10, 40);
//     doc.text(`PAN No: ${invoiceData.sellerDetails.pan}`, 10, 45);
//     doc.text(`GST Registration No: ${invoiceData.sellerDetails.gst}`, 10, 50);

//     // Billing and Shipping details
//     doc.text('Billing Address:', 140, 30);
//     doc.text(`${invoiceData.billingDetails.name}`, 140, 35);
//     doc.text(`${invoiceData.billingDetails.address}`, 140, 40);
//     doc.text(`State/UT Code: ${invoiceData.billingDetails.stateCode}`, 140, 50);

//     doc.text('Shipping Address:', 140, 60);
//     doc.text(`${invoiceData.shippingDetails.name}`, 140, 65);
//     doc.text(`${invoiceData.shippingDetails.address}`, 140, 70);
//     doc.text(`State/UT Code: ${invoiceData.shippingDetails.stateCode}`, 140, 80);

//     // Order and Invoice details
//     doc.text(`Order Number: ${invoiceData.orderDetails.orderNo}`, 10, 70);
//     doc.text(`Order Date: ${invoiceData.orderDetails.orderDate}`, 10, 75);
//     doc.text(`Invoice Number: ${invoiceData.invoiceDetails.invoiceNo}`, 10, 80);
//     doc.text(`Invoice Date: ${invoiceData.invoiceDetails.invoiceDate}`, 10, 85);

//     // Table for items
//     doc.autoTable({
//       startY: 90,
//       head: [['SL', 'Description', 'Qty', 'Unit Price', 'Net Amount', 'Tax (CGST/SGST/IGST)', 'Total']],
//       body: invoiceData.items.map((item, index) => [
//         index + 1,
//         item.description,
//         item.quantity,
//         `₹${item.unitPrice.toFixed(2)}`,
//         `₹${item.netAmount.toFixed(2)}`,
//         `CGST: ₹${item.taxAmount.CGST.toFixed(2)} | SGST: ₹${item.taxAmount.SGST.toFixed(2)} | IGST: ₹${item.taxAmount.IGST.toFixed(2)}`,
//         `₹${item.totalAmount.toFixed(2)}`,
//       ]),
//     });

//     // Total
//     const totalAmount = invoiceData.items.reduce((acc, item) => acc + item.totalAmount, 0).toFixed(2);
//     doc.text(`TOTAL: ₹${totalAmount}`, 10, doc.lastAutoTable.finalY + 10);

//     // Signature
//     if (signature) {
//       const reader = new FileReader();
//       reader.readAsDataURL(signature);
//       reader.onload = function () {
//         doc.addImage(reader.result, 'PNG', 10, doc.lastAutoTable.finalY + 30, 50, 15); // Adjust positioning
//         doc.save(`invoice_${invoiceData.invoiceDetails.invoiceNo}.pdf`);
//       };
//     } else {
//       doc.save(`invoice_${invoiceData.invoiceDetails.invoiceNo}.pdf`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Seller, Billing, Shipping Details */}
//       <div>
//         <h3>Seller Details</h3>
//         <input
//           type="text"
//           value={sellerDetails.name}
//           onChange={(e) => setSellerDetails({ ...sellerDetails, name: e.target.value })}
//           placeholder="Seller Name"
//         />
//         <input
//           type="text"
//           value={sellerDetails.address}
//           onChange={(e) => setSellerDetails({ ...sellerDetails, address: e.target.value })}
//           placeholder="Seller Address"
//         />
//         <input
//           type="text"
//           value={sellerDetails.city}
//           onChange={(e) => setSellerDetails({ ...sellerDetails, city: e.target.value })}
//           placeholder="Seller City"
//         />
//         <input
//           type="text"
//           value={sellerDetails.state}
//           onChange={(e) => setSellerDetails({ ...sellerDetails, state: e.target.value })}
//           placeholder="Seller State"
//         />
//         <input
//           type="text"
//           value={sellerDetails.pincode}
//           onChange={(e) => setSellerDetails({ ...sellerDetails, pincode: e.target.value })}
//           placeholder="Seller Pincode"
//         />
//         <input
//           type="text"
//           value={sellerDetails.pan}
//           onChange={(e) => setSellerDetails({ ...sellerDetails, pan: e.target.value })}
//           placeholder="Seller PAN No."
//         />
//         <input
//           type="text"
//           value={sellerDetails.gst}
//           onChange={(e) => setSellerDetails({ ...sellerDetails, gst: e.target.value })}
//           placeholder="Seller GST Registration No."
//         />
//       </div>

//       <div>
//         <h3>Billing Details</h3>
//         <input
//           type="text"
//           value={billingDetails.name}
//           onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
//           placeholder="Billing Name"
//         />
//         <input
//           type="text"
//           value={billingDetails.address}
//           onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
//           placeholder="Billing Address"
//         />
//         <input
//           type="text"
//           value={billingDetails.city}
//           onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
//           placeholder="Billing City"
//         />
//         <input
//           type="text"
//           value={billingDetails.state}
//           onChange={(e) => setBillingDetails({ ...billingDetails, state: e.target.value })}
//           placeholder="Billing State"
//         />
//         <input
//           type="text"
//           value={billingDetails.pincode}
//           onChange={(e) => setBillingDetails({ ...billingDetails, pincode: e.target.value })}
//           placeholder="Billing Pincode"
//         />
//         <input
//           type="text"
//           value={billingDetails.stateCode}
//           onChange={(e) => setBillingDetails({ ...billingDetails, stateCode: e.target.value })}
//           placeholder="Billing State Code"
//         />
//       </div>

//       <div>
//         <h3>Shipping Details</h3>
//         <input
//           type="text"
//           value={shippingDetails.name}
//           onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
//           placeholder="Shipping Name"
//         />
//         <input
//           type="text"
//           value={shippingDetails.address}
//           onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
//           placeholder="Shipping Address"
//         />
//         <input
//           type="text"
//           value={shippingDetails.city}
//           onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
//           placeholder="Shipping City"
//         />
//         <input
//           type="text"
//           value={shippingDetails.state}
//           onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
//           placeholder="Shipping State"
//         />
//         <input
//           type="text"
//           value={shippingDetails.pincode}
//           onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
//           placeholder="Shipping Pincode"
//         />
//         <input
//           type="text"
//           value={shippingDetails.stateCode}
//           onChange={(e) => setShippingDetails({ ...shippingDetails, stateCode: e.target.value })}
//           placeholder="Shipping State Code"
//         />
//       </div>

//       {/* Item Details */}
//       <div>
//         <h3>Item Details</h3>
//         {items.map((item, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={item.description}
//               onChange={(e) => handleItemChange(index, 'description', e.target.value)}
//               placeholder="Description"
//             />
//             <input
//               type="number"
//               value={item.unitPrice}
//               onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
//               placeholder="Unit Price"
//             />
//             <input
//               type="number"
//               value={item.quantity}
//               onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
//               placeholder="Quantity"
//             />
//             <input
//               type="number"
//               value={item.discount}
//               onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value))}
//               placeholder="Discount"
//             />
//             <button onClick={() => handleRemoveItem(index)}>Remove Item</button>
//           </div>
//         ))}
//         <button onClick={handleAddItem}>Add Item</button>
//       </div>

//       {/* Logo and Signature Upload */}
//       <div>
//         <h3>Upload Logo and Signature</h3>
//         <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
//         <input type="file" accept="image/*" onChange={(e) => setSignature(e.target.files[0])} />
//       </div>

//       {/* Invoice Preview Button */}
//       <button type="submit">Generate Invoice</button>
//     </form>
//   );
// };

// export default InvoiceForm;

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import InvoiceTemplate from './InvoiceTemplate';

const InvoiceForm = () => {
  const [sellerDetails, setSellerDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', pan: '', gst: '' });
  const [billingDetails, setBillingDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', stateCode: '' });
  const [shippingDetails, setShippingDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', stateCode: '' });
  const [items, setItems] = useState([{ description: '', unitPrice: 0, quantity: 0, discount: 0 }]);
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [reverseCharge, setReverseCharge] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ orderNo: '', orderDate: '' });
  const [invoiceDetails, setInvoiceDetails] = useState({ invoiceNo: '', invoiceDate: '' });
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [preview,setPreview] = useState(false)
  const [totalAmountInWords, setTotalAmountInWords] = useState('');

  const handleAddItem = () => {
    setItems([...items, { description: '', unitPrice: 0, quantity: 0, discount: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateNetAmount = (item) => {
    return item.unitPrice * item.quantity - item.discount;
  };

  const calculateTaxAmount = (netAmount) => {
    return {
      CGST: (netAmount * 0.09), // 9%
      SGST: (netAmount * 0.09), // 9%
      IGST: netAmount * 0.18, // 18%
    };
  };

  const calculateTotalAmount = (netAmount, taxAmount) => {
    return netAmount + Object.values(taxAmount).reduce((sum, tax) => sum + tax, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const itemsWithCalculations = items.map(item => {
    //   const netAmount = calculateNetAmount(item);
    //   const taxAmount = calculateTaxAmount(netAmount);
    //   const totalAmount = calculateTotalAmount(netAmount, taxAmount);

    //   return {
    //     ...item,
    //     netAmount,
    //     taxAmount,
    //     totalAmount,
    //   };
    // });

    // // Now generate the PDF after calculation
    // generatePdf({
    //   sellerDetails,
    //   billingDetails,
    //   shippingDetails,
    //   orderDetails,
    //   invoiceDetails,
    //   items: itemsWithCalculations,
    //   placeOfDelivery,
    //   reverseCharge,
    // });
    const convertNumberToWords = (num) => {
        // Implement the number to words conversion or use a library for this
        return "Amount in Words"; // Placeholder
      };

    const itemsWithCalculations = items.map(item => {
        const netAmount = item.unitPrice * item.quantity - item.discount;
        const taxAmount = {
          CGST: netAmount * 0.09,
          SGST: netAmount * 0.09,
          IGST: netAmount * 0.18
        };
        const totalAmount = netAmount + taxAmount.CGST + taxAmount.SGST + taxAmount.IGST;
  
        return { ...item, netAmount, taxAmount, totalAmount };
      });
  
      const totalAmount = itemsWithCalculations.reduce((acc, item) => acc + item.totalAmount, 0);
      const amountInWords = convertNumberToWords(totalAmount);
  
      setTotalAmountInWords(amountInWords);
      setPreview(true);
  };



//   const generatePdf = (invoiceData) => {
//     const doc = new jsPDF();

//     // Add logo
//     if (logo) {
//       const reader = new FileReader();
//       reader.readAsDataURL(logo);
//       reader.onload = function () {
//         doc.addImage(reader.result, 'PNG', 10, 5, 50, 15); // Adjust positioning
//         generatePdfContent(doc, invoiceData);
//       };
//     } else {
//       generatePdfContent(doc, invoiceData);
//     }
//   };

  const generatePdfContent = (doc, invoiceData) => {
    // Seller details
    doc.setFontSize(11);
    doc.text('Sold By:', 10, 30);
    doc.text(`${invoiceData.sellerDetails.name}`, 10, 35);
    doc.text(`${invoiceData.sellerDetails.address}`, 10, 40);
    doc.text(`PAN No: ${invoiceData.sellerDetails.pan}`, 10, 45);
    doc.text(`GST Registration No: ${invoiceData.sellerDetails.gst}`, 10, 50);

    // Billing and Shipping details
    doc.text('Billing Address:', 140, 30);
    doc.text(`${invoiceData.billingDetails.name}`, 140, 35);
    doc.text(`${invoiceData.billingDetails.address}`, 140, 40);
    doc.text(`State/UT Code: ${invoiceData.billingDetails.stateCode}`, 140, 50);

    doc.text('Shipping Address:', 140, 60);
    doc.text(`${invoiceData.shippingDetails.name}`, 140, 65);
    doc.text(`${invoiceData.shippingDetails.address}`, 140, 70);
    doc.text(`State/UT Code: ${invoiceData.shippingDetails.stateCode}`, 140, 80);

    // Order and Invoice details
    doc.text(`Order Number: ${invoiceData.orderDetails.orderNo}`, 10, 70);
    doc.text(`Order Date: ${invoiceData.orderDetails.orderDate}`, 10, 75);
    doc.text(`Invoice Number: ${invoiceData.invoiceDetails.invoiceNo}`, 10, 80);
    doc.text(`Invoice Date: ${invoiceData.invoiceDetails.invoiceDate}`, 10, 85);

    // Table for items
    doc.autoTable({
      startY: 90,
      head: [['SL', 'Description', 'Qty', 'Unit Price', 'Net Amount', 'Tax (CGST/SGST/IGST)', 'Total']],
      body: invoiceData.items.map((item, index) => [
        index + 1,
        item.description,
        item.quantity,
        `₹${item.unitPrice.toFixed(2)}`,
        `₹${item.netAmount.toFixed(2)}`,
        `CGST: ₹${item.taxAmount.CGST.toFixed(2)} | SGST: ₹${item.taxAmount.SGST.toFixed(2)} | IGST: ₹${item.taxAmount.IGST.toFixed(2)}`,
        `₹${item.totalAmount.toFixed(2)}`,
      ]),
    });

    // Total
    const totalAmount = invoiceData.items.reduce((acc, item) => acc + item.totalAmount, 0).toFixed(2);
    doc.text(`TOTAL: ₹${totalAmount}`, 10, doc.lastAutoTable.finalY + 10);

    // Signature
    if (signature) {
      const reader = new FileReader();
      reader.readAsDataURL(signature);
      reader.onload = function () {
        doc.addImage(reader.result, 'PNG', 10, doc.lastAutoTable.finalY + 30, 50, 15); // Adjust positioning
        doc.save(`invoice_${invoiceData.invoiceDetails.invoiceNo}.pdf`);
      };
    } else {
      doc.save(`invoice_${invoiceData.invoiceDetails.invoiceNo}.pdf`);
    }
  };

  return (
    <>
      {
         preview ? (
            <div>
          <InvoiceTemplate
            sellerDetails={sellerDetails}
            billingDetails={billingDetails}
            shippingDetails={shippingDetails}
            orderDetails={orderDetails}
            invoiceDetails={invoiceDetails}
            items={items}
            totalAmountInWords={totalAmountInWords}
            logo={logo}
            signature={signature}
          />
        </div>
         )
         :(
            <form onSubmit={handleSubmit}>
            {/* Seller, Billing, Shipping Details */}
            <div>
              <h3>Seller Details</h3>
              <input
                type="text"
                value={sellerDetails.name}
                onChange={(e) => setSellerDetails({ ...sellerDetails, name: e.target.value })}
                placeholder="Seller Name"
              />
              <input
                type="text"
                value={sellerDetails.address}
                onChange={(e) => setSellerDetails({ ...sellerDetails, address: e.target.value })}
                placeholder="Seller Address"
              />
              <input
                type="text"
                value={sellerDetails.city}
                onChange={(e) => setSellerDetails({ ...sellerDetails, city: e.target.value })}
                placeholder="Seller City"
              />
              <input
                type="text"
                value={sellerDetails.state}
                onChange={(e) => setSellerDetails({ ...sellerDetails, state: e.target.value })}
                placeholder="Seller State"
              />
              <input
                type="text"
                value={sellerDetails.pincode}
                onChange={(e) => setSellerDetails({ ...sellerDetails, pincode: e.target.value })}
                placeholder="Seller Pincode"
              />
              <input
                type="text"
                value={sellerDetails.pan}
                onChange={(e) => setSellerDetails({ ...sellerDetails, pan: e.target.value })}
                placeholder="Seller PAN No."
              />
              <input
                type="text"
                value={sellerDetails.gst}
                onChange={(e) => setSellerDetails({ ...sellerDetails, gst: e.target.value })}
                placeholder="Seller GST Registration No."
              />
            </div>
      
            <div>
              <h3>Billing Details</h3>
              <input
                type="text"
                value={billingDetails.name}
                onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                placeholder="Billing Name"
              />
              <input
                type="text"
                value={billingDetails.address}
                onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                placeholder="Billing Address"
              />
              <input
                type="text"
                value={billingDetails.city}
                onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
                placeholder="Billing City"
              />
              <input
                type="text"
                value={billingDetails.state}
                onChange={(e) => setBillingDetails({ ...billingDetails, state: e.target.value })}
                placeholder="Billing State"
              />
              <input
                type="text"
                value={billingDetails.pincode}
                onChange={(e) => setBillingDetails({ ...billingDetails, pincode: e.target.value })}
                placeholder="Billing Pincode"
              />
              <input
                type="text"
                value={billingDetails.stateCode}
                onChange={(e) => setBillingDetails({ ...billingDetails, stateCode: e.target.value })}
                placeholder="Billing State Code"
              />
            </div>
      
            <div>
              <h3>Shipping Details</h3>
              <input
                type="text"
                value={shippingDetails.name}
                onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                placeholder="Shipping Name"
              />
              <input
                type="text"
                value={shippingDetails.address}
                onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                placeholder="Shipping Address"
              />
              <input
                type="text"
                value={shippingDetails.city}
                onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                placeholder="Shipping City"
              />
              <input
                type="text"
                value={shippingDetails.state}
                onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                placeholder="Shipping State"
              />
              <input
                type="text"
                value={shippingDetails.pincode}
                onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
                placeholder="Shipping Pincode"
              />
              <input
                type="text"
                value={shippingDetails.stateCode}
                onChange={(e) => setShippingDetails({ ...shippingDetails, stateCode: e.target.value })}
                placeholder="Shipping State Code"
              />
            </div>
      
            {/* Item Details */}
            <div>
              <h3>Item Details</h3>
              {items.map((item, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                    placeholder="Unit Price"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    placeholder="Quantity"
                  />
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value))}
                    placeholder="Discount"
                  />
                  <button onClick={() => handleRemoveItem(index)}>Remove Item</button>
                </div>
              ))}
              <button onClick={handleAddItem}>Add Item</button>
            </div>
      
            {/* Logo and Signature Upload */}
            <div>
              <h3>Upload Logo and Signature</h3>
              <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
              <input type="file" accept="image/*" onChange={(e) => setSignature(e.target.files[0])} />
            </div>
      
            {/* Invoice Preview Button */}
            <button  type="submit">Generate Invoice</button>
          </form>
         )
      }
    </>
   
  );
};

export default InvoiceForm;

