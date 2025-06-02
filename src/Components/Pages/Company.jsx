import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Company.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Company = () => {
  const [formData, setFormData] = useState({
    companyName: 'NMM Company',
    taxType: 'GST (SGST+CGST,IGST)',
    gstinNo: 'NM1234567890',
    state: 'Uttar Pradesh (62)',
    address: "W- Sector-12' Noida",
    pincode: '201301',
    invoiceSerialNo: 'A- 1:000',
    invoiceHeader: 'Noida: +4\n+4 Sector-4 Noida\nMobile: +91 959997',
    invoiceFooter: '1. Goods sold can be replaced within 3 days.\n2. The items must be in their original condition and packaging.',
    invoiceSize: 'POS Thermal (80mm)',
    timeZone: 'India (Asia/Kolkata)',
    logo: null
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // Here you would typically send data to an API
      console.log('Form submitted:', formData);
      alert('Company details saved successfully!');
      Link('/dashboard'); // Redirect after save
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.taxType) errors.taxType = 'Tax type is required';
    if (formData.taxType.includes('GST') && !formData.gstinNo.trim()) {
      errors.gstinNo = 'GSTIN is required for GST tax type';
    }
    return errors;
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4 text-center">Company Details</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <div className="row g-3">
          {/* Row 1 */}
          <div className="col-md-4">
            <label htmlFor="companyName" className="form-label">Company Name*</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`form-control${errors.companyName ? ' is-invalid' : ''}`}
            />
            {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
          </div>
          <div className="col-md-4">
            <label htmlFor="taxType" className="form-label">Tax Type*</label>
            <select
              id="taxType"
              name="taxType"
              value={formData.taxType}
              onChange={handleChange}
              className={`form-select${errors.taxType ? ' is-invalid' : ''}`}
            >
              <option value="GST (SGST+CGST,IGST)">GST (SGST+CGST,IGST)</option>
              <option value="VAT">VAT</option>
              <option value="No Tax">No Tax</option>
            </select>
            {errors.taxType && <div className="invalid-feedback">{errors.taxType}</div>}
          </div>
          {/* Row 2 */}
          <div className="col-md-4">
            <label htmlFor="gstinNo" className="form-label">GSTIN No.</label>
            <input
              type="text"
              id="gstinNo"
              name="gstinNo"
              value={formData.gstinNo}
              onChange={handleChange}
              className={`form-control${errors.gstinNo ? ' is-invalid' : ''}`}
              disabled={!formData.taxType.includes('GST')}
            />
            {errors.gstinNo && <div className="invalid-feedback">{errors.gstinNo}</div>}
          </div>
          {/* Row 3 */}
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input
              type="text"
              value={formData.state}
              readOnly
              className="form-control mb-2"
            />

          </div>
          <div className="col-md-8">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* Row 5 */}
          <div className="col-md-4">
            <label htmlFor="pincode" className="form-label">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceSerialNo" className="form-label">Invoice Serial No.</label>
            <input
              type="text"
              id="invoiceSerialNo"
              name="invoiceSerialNo"
              value={formData.invoiceSerialNo}
              onChange={handleChange}
              className="form-control"
            />
            <div className="form-text">auto adjust on bill delete</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceSize" className="form-label">Invoice Size</label>
            <select
              id="invoiceSize"
              name="invoiceSize"
              value={formData.invoiceSize}
              onChange={handleChange}
              className="form-select"
            >
              <option value="POS Thermal (80mm)">POS Thermal (80mm)</option>
              <option value="A4 (210mm × 297mm)">A4 (210mm × 297mm)</option>
              <option value="Letter (216mm × 279mm)">Letter (216mm × 279mm)</option>
            </select>
          </div>
          {/* Row 6 */}
          <div className="col-md-6">
            <label htmlFor="invoiceHeader" className="form-label">Invoice Header</label>
            <textarea
              id="invoiceHeader"
              name="invoiceHeader"
              value={formData.invoiceHeader}
              onChange={handleChange}
              rows="3"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="invoiceFooter" className="form-label">Invoice Footer</label>
            <textarea
              id="invoiceFooter"
              name="invoiceFooter"
              value={formData.invoiceFooter}
              onChange={handleChange}
              rows="3"
              className="form-control"
            />
          </div>
          {/* Row 8 */}
          <div className="col-md-6">
            <label htmlFor="timeZone" className="form-label">Time Zone</label>
            <select
              id="timeZone"
              name="timeZone"
              value={formData.timeZone}
              onChange={handleChange}
              className="form-select"
            >
              <option value="India (Asia/Kolkata)">India (Asia/Kolkata)</option>
              <option value="UTC">UTC</option>
              <option value="EST (America/New_York)">EST (America/New_York)</option>
            </select>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-6">
                <label htmlFor="logo" className="form-label">Company Logo</label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleChange}
                  accept="image/*"
                  className="form-control"
                />
                <div className="form-text">{formData.logo ? formData.logo.name : 'Choose File'}</div>
              </div>
              <div className="col-6">
                <label htmlFor="timeZone" className="form-label">Sign</label>
                <input
                  type="file"
                  id="sign"
                  name="sign"
                  onChange={handleChange}
                  accept="image/*"
                  className="form-control"
                />
                <div className="form-text">Upload your signature image</div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 mt-5 justify-content-center">
          <button type="submit" className="btn btn-success">
            <i className="fas fa-save me-2"></i>Save Company
          </button>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/purchase')}>
            <i className="fas fa-shopping-cart me-2"></i>Go to Purchase
          </button>
          <button type="button" className="btn btn-danger" onClick={() => navigate('/Logout')}>
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </button>
        </div>
      </form>
    </div>
  );
};



/*

import React from 'react'
import { Link } from 'react-router-dom'

export const Company = () =>{
  return (
    <div>
        <h1>Company</h1>
        <p>Welcome to your Company! Page you can manage your company information.</p>
        <br/>
        <button><Link to="/settings">Go to Settings</Link></button>
         <br/>
        <button><Link to="/logout">Go to Logout</Link></button>
    </div>
  );
};

*/
//export default Dashboard