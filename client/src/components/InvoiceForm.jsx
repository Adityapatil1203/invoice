import React, { useState } from 'react';

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    seller: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      pan: '',
      gst: ''
    },
    billing: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    shipping: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    placeOfSupply: '',
    placeOfDelivery: '',
    order: {
      orderNo: '',
      orderDate: ''
    },
    invoice: {
      invoiceNo: '',
      invoiceDate: '',
      reverseCharge: false
    },
    items: [
      {
        description: '',
        unitPrice: '',
        quantity: '',
        discount: '',
        taxRate: 18
      }
    ],
    signature: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index] = {
      ...items[index],
      [name]: value
    };
    setFormData((prevData) => ({
      ...prevData,
      items
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Seller Information</h2>
      <input name="seller.name" placeholder="Seller Name" onChange={handleInputChange} />
      <input name="seller.address" placeholder="Seller Address" onChange={handleInputChange} />
      <input name="seller.city" placeholder="City" onChange={handleInputChange} />
      <input name="seller.state" placeholder="State" onChange={handleInputChange} />
      <input name="seller.pincode" placeholder="Pincode" onChange={handleInputChange} />
      <input name="seller.pan" placeholder="PAN No." onChange={handleInputChange} />
      <input name="seller.gst" placeholder="GST Registration No." onChange={handleInputChange} />

      <h2>Billing Information</h2>
      <input name="billing.name" placeholder="Billing Name" onChange={handleInputChange} />
      <input name="billing.address" placeholder="Billing Address" onChange={handleInputChange} />
      <input name="billing.city" placeholder="Billing City" onChange={handleInputChange} />
      <input name="billing.state" placeholder="Billing State" onChange={handleInputChange} />
      <input name="billing.pincode" placeholder="Billing Pincode" onChange={handleInputChange} />
      <input name="billing.stateCode" placeholder="Billing State/UT Code" onChange={handleInputChange} />

      <h2>Order Details</h2>
      <input name="order.orderNo" placeholder="Order No." onChange={handleInputChange} />
      <input name="order.orderDate" placeholder="Order Date" type="date" onChange={handleInputChange} />

      <h2>Item Details</h2>
      {formData.items.map((item, index) => (
        <div key={index}>
          <input name="description" placeholder="Item Description" onChange={(e) => handleItemChange(index, e)} />
          <input name="unitPrice" placeholder="Unit Price" type="number" onChange={(e) => handleItemChange(index, e)} />
          <input name="quantity" placeholder="Quantity" type="number" onChange={(e) => handleItemChange(index, e)} />
          <input name="discount" placeholder="Discount" type="number" onChange={(e) => handleItemChange(index, e)} />
        </div>
      ))}

      <h2>Signature</h2>
      <input name="signature" placeholder="Signature URL" onChange={handleInputChange} />

      <button type="submit">Preview Invoice</button>
    </form>
  );
};

export default InvoiceForm;
