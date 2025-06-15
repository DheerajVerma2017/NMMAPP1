import { useState } from 'react';
import './Sales.css';
import { FaFileExcel, FaEye, FaPause, FaRupeeSign, FaCreditCard, FaQrcode } from 'react-icons/fa';

export const Sales = () => {
  const [formData, setFormData] = useState({
    type: 'Sales',
    refNo: '',
    name: '',
    loyaltyCard: '',
    mobile: '',
    address: '',
    invoiceNo: '',
    gstNo: '',
    state: 'Uttar Pradesh (09)',
    date: new Date().toISOString().split('T')[0],
    shipTo: '',
    items: [{
      barcode: '',
      description: '',
      category: 'General',
      unit: 'PCS-PRE',
      quantity: 1,
      gross: 0,
      salePrice: 0,
      hsn: '',
      gstPercent: 0,
    }],
    payment: {
      cash: 0,
      card: 0,
      upi: 0,
      expense: 0,
      savings: 0,
      change: 0,
      total: 0
    },
    holdItems: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = {
        ...newItems[index],
        [name]: name === 'quantity' || name === 'gross' || name === 'salePrice' || name === 'gstPercent'
          ? parseFloat(value) || 0
          : value
      };

      // Calculate total if price or quantity changes
      if (name === 'quantity' || name === 'salePrice') {
        newItems[index].gross = newItems[index].quantity * newItems[index].salePrice;
      }
      return { ...prev, items: newItems };
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [name]: parseFloat(value) || 0,
        total: prev.items.reduce((sum, item) => sum + item.gross, 0)
      }
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          barcode: '',
          description: '',
          category: 'General',
          unit: 'PCS-PRE',
          quantity: 1,
          gross: 0,
          salePrice: 0,
          hsn: '',
          gstPercent: 0,
        }
      ]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  const holdCurrentItems = () => {
    setFormData(prev => ({
      ...prev,
      holdItems: [...prev.holdItems, ...prev.items],
      items: [{
        barcode: '',
        description: '',
        category: 'General',
        unit: 'PCS-PRE',
        quantity: 1,
        gross: 0,
        salePrice: 0,
        hsn: '',
        gstPercent: 0,
      }]
    }));
  };

  const viewHoldItems = () => {
    // Implement modal or separate view for hold items
    console.log('Hold items:', formData.holdItems);
  };

  const importFromExcel = () => {
    // Implement Excel import functionality
    console.log('Import from Excel');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = formData.items.reduce((sum, item) => sum + item.gross, 0);
    const updatedForm = {
      ...formData,
      payment: { ...formData.payment, total }
    };
    console.log('Sales form submitted:', updatedForm);
    // Submit to backend
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <form className="bg-white p-4 rounded shadow-sm" onSubmit={handleSubmit}>
            <div>
              <div className="row">
                <div className="col-md-2 mb-3">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                    <option value="Sales">Sales</option>
                    <option value="Return">Return</option>
                    <option value="Exchange">Exchange</option>
                    <option value="Credit Note">Credit Note</option>
                    <option value="Debit Note">Debit Note</option>
                    <option value="Gift Voucher">Gift Voucher</option>
                  </select>
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Ref.</label>
                  <input type="text" className="form-control" name="refNo" value={formData.refNo} onChange={handleChange} />
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Ship</label>
                  <input type="text" className="form-control" name="shipTo" value={formData.shipTo} onChange={handleChange} />
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Mobile</label>
                  <input type="text" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Invoice</label>
                  <input type="text" className="form-control" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} />
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <div className="col-md-2 mb-3">
                  <label className="form-label">State</label>
                  <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                    <option value="Jammu and Kashmir (01)">Jammu and Kashmir (01)</option>
                    <option value="Himachal Pradesh (02)">Himachal Pradesh (02)</option>
                    <option value="Punjab (03)">Punjab (03)</option>
                    <option value="Chandigarh (04)">Chandigarh (04)</option>
                    <option value="Uttarakhand (05)">Uttarakhand (05)</option>
                    <option value="Haryana (06)">Haryana (06)</option>
                    <option value="Delhi (07)">Delhi (07)</option>
                    <option value="Rajasthan (08)">Rajasthan (08)</option>
                    <option value="Uttar Pradesh (09)">Uttar Pradesh (09)</option>
                    <option value="Bihar (11)">Bihar (11)</option>
                    <option value="Sikkim (12)">Sikkim (12)</option>
                    <option value="Arunachal Pradesh (13)">Arunachal Pradesh (13)</option>
                    <option value="Nagaland (14)">Nagaland (14)</option>
                    <option value="Manipur (15)">Manipur (15)</option>
                    <option value="Mizoram (16)">Mizoram (16)</option>
                    <option value="Tripura (17)">Tripura (17)</option>
                    <option value="Assam (18)">Assam (18)</option>
                    <option value="West Bengal (19)">West Bengal (19)</option>
                    <option value="Jharkhand (20)">Jharkhand (20)</option>
                    <option value="Odisha (21)">Odisha (21)</option>
                    <option value="Chhattisgarh (22)">Chhattisgarh (22)</option>
                    <option value="Madhya Pradesh (23)">Madhya Pradesh (23)</option>
                    <option value="Gujarat (24)">Gujarat (24)</option>
                    <option value="Daman and Diu (25)">Daman and Diu (25)</option>
                    <option value="Dadra and Nagar Haveli (26)">Dadra and Nagar Haveli (26)</option>
                    <option value="Maharashtra (27)">Maharashtra (27)</option>
                    <option value="Karnataka (29)">Karnataka (29)</option>
                    <option value="Goa (30)">Goa (30)</option>
                    <option value="Lakshadweep (31)">Lakshadweep (31)</option>
                    <option value="Kerala (32)">Kerala (32)</option>
                    <option value="Tamil Nadu (33)">Tamil Nadu (33)</option>
                    <option value="Puducherry (34)">Puducherry (34)</option>
                    <option value="Andaman and Nicobar Islands (35)">Andaman and Nicobar Islands (35)</option>
                    <option value="Telangana (36)">Telangana (36)</option>
                    <option value="Andhra Pradesh (37)">Andhra Pradesh (37)</option>
                    {/* Add other states as needed */}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Barcode</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Unit</th>
                    <th>Qty</th>
                    <th>Gross</th>
                    <th>Sale Price</th>
                    <th>HSN</th>
                    <th>GST%</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td><input type="text" className="form-control form-control-sm" name="barcode" /></td>
                    <td><input type="text" className="form-control form-control-sm" name="description" /></td>
                    <td>
                      <select className="form-select form-select-sm" name="category">
                        <option value="General">General</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Fashion">Fashion</option>
                        <option value="WomenWear">Women Wear</option>
                        <option value="MenWear">Men Wear</option>
                        <option value="FootWear">Foot Wear</option>
                        <option value="KidsWear">Kids Wear</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </td>
                    <td><input type="text" className="form-control form-control-sm" name="unit" /></td>
                    <td><input type="number" className="form-control form-control-sm" name="quantity" min="1" /></td>
                    <td></td>
                    <td><input type="number" className="form-control form-control-sm" name="salePrice" min="0" step="0.01" /></td>
                    <td><input type="text" className="form-control form-control-sm" name="hsn" /></td>
                    <td><input type="number" className="form-control form-control-sm" name="gstPercent" min="0" max="100" /></td>
                    <td>
                      <button type="button" className="btn btn-primary btn-sm">Add</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Locate</th>
                      <th>Offers</th>
                      <th>MRP</th>
                      <th>Gross</th>
                      <th>Net Qty</th>
                      <th>Price</th>
                      <th>Rate</th>
                      <th>Value</th>
                      <th>Dics.</th>
                      <th>GST%</th>
                      <th>Total Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="locate"
                            value={item.locate}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="offers"
                            value={item.offers}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="mrp"
                            value={item.mrp}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="gross"
                            value={item.gross}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="salePrice"
                            value={item.salePrice}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="rate"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="value"
                            value={item.value}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="discount"
                            value={item.discount}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="gstPercent"
                            value={item.gstPercent}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name="totalValue"
                            value={item.totalValue}
                            readOnly
                          />
                        </td>
                        <td>
                          <div className='d-flex'><button className="btn btn-warning btn-sm me-1">
                            <i className="fas fa-edit"></i>
                          </button>
                            <button className="btn btn-danger btn-sm">
                              <i className="fas fa-trash-alt"></i>
                            </button></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="payment-wrapper">
              <div className="payment-section ms-auto">
                <div className="form-col">
                  <h5>Payment</h5>
                  <div className="form-group flex-row align-items-center">
                    <label>Cash</label>
                    <input
                      type="number"
                      name="cash"
                      value={formData.payment.cash}
                      onChange={handlePaymentChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group flex-row align-items-center">
                    <label>Card</label>
                    <input
                      type="number"
                      name="card"
                      value={formData.payment.card}
                      onChange={handlePaymentChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group flex-row align-items-center">
                    <label>UPI</label>
                    <input
                      type="number"
                      name="upi"
                      value={formData.payment.upi}
                      onChange={handlePaymentChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group flex-row align-items-center">
                    <label className='fw-bold'>Total</label>
                    <input
                      type="number"
                      name="total"
                      value={formData.payment.total}
                      readOnly
                      className="form-control"
                    />
                  </div>
                </div>                
              </div>
            </div>

            <div className="form-actions d-flex gap-2 mt-4 justify-content-end">
              <button type="submit" className="btn btn-success">Save Sale</button>
              <button type="button" className="btn btn-danger">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


/*
import React from "react";
import { Link } from "react-router-dom";

export const Sales = () => {
  return (
  <>
      <h1>Sales</h1>
      <h2>Welcome to Sales Services Page</h2>
      <div>
        <br/>
        <h3>Welcome to Sales Services Page</h3>
        <h3>Sales show analysis your web Application.</h3>
        <br/>
        <button><Link to="/company">Go to Company</Link></button>
        <br/>
        <button><Link to="/Login">Go to Login</Link></button>
        </div>
    </>
  );
};
*/