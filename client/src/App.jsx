import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
// import './styles.css';

function App() {
  const [formData, setFormData] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);

  // Handle form submission
  const handleFormSubmit = async (data) => {
    setFormData(data); // Store form data when submitted
  };

  // Handle invoice generation (from the backend response)
  const handleInvoiceGeneration = (generatedInvoice) => {
    setInvoiceData(generatedInvoice); // Set the invoice data from the backend (likely containing PDF URL)
  };

  return (
    <div className="app">
      <h1>Invoice Generator</h1>

      {/* Render InvoiceForm to collect invoice details */}
      <InvoiceForm onSubmit={handleFormSubmit} />

      {/* If form data is available, show invoice preview */}
      {formData && (
        <InvoicePreview formData={formData} onGenerate={handleInvoiceGeneration} />
      )}

      {/* Display the generated invoice download link if invoiceData is available */}
      {invoiceData && (
        <div>
          <h2>Invoice Generated Successfully</h2>
          <a href={invoiceData.pdfUrl} target="_blank" rel="noopener noreferrer" download>
            Download Invoice PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
