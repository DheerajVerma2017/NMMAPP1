import { useState } from 'react';
import './Purchase.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Purchase = () => {
  const [formData, setFormData] = useState({
    type: 'Purchase',
    refNo: '',
    name: '',
    mobile: '',
    address: '',
    cardNo: '',
    invoiceNo: '',
    gstNo: '',
    state: '',
    date: new Date().toISOString().split('T')[0],
    items: [{
      barcode: '',
      brand: '',
      description: '',
      category: 'General',
      stockType: 'General Goods',
      unit: '',
      rate: '',
      profit: '',
      hsn: '',
      gstPercent: '',
      salePrice: '',
      mrp: '',
      error: ''
    }],
    payment: {
      cash: 0,
      card: 0,
      upi: 0,
      total: 0
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [name]: value };
      return { ...prev, items: newItems };
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      payment: { ...prev.payment, [name]: parseFloat(value) || 0 }
    }));
  };
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          barcode: '',
          brand: '',
          description: '',
          category: 'General',
          stockType: 'General Goods',
          unit: '',
          rate: '',
          profit: '',
          hsn: '',
          gstPercent: '',
          salePrice: '',
          mrp: '',
          error: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate total
    const total = formData.items.reduce((sum, item) => {
      return sum + (parseFloat(item.salePrice) || 0);
    }, 0);

    const updatedForm = {
      ...formData,
      payment: { ...formData.payment, total }
    };

    console.log('Form submitted:', updatedForm);
    // Here you would typically send data to your backend
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <h1 className="mb-4 text-center">Purchase Entry</h1>
          <form className="bg-white p-2 rounded shadow-sm" onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="form-select">
                    <option value="Purchase">Purchase</option>
                    <option value="Return">Return</option>
                    <option value="Exchange">Exchange</option>
                    <option value="Repair">Repair</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Refund">Refund</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ref. No.</label>
                  <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label> Ship To </label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <div className='d-flex gap-3'>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
                    <input type="text" name="cardNo" value={formData.cardNo} onChange={handleChange} placeholder='L Card' className='card form-control' />
                  </div>
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type='text' name="address" value={formData.address} onChange={handleChange} className="form-control" />
                </div>
              </div>


              <div className="form-row">
                <div className="form-group">
                  <label>Invoice No.</label>
                  <div className='d-flex gap-3'>
                    <input type="text" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className='card form-control' />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <label>GST No.</label>
                  <input type="text" name="gstNo" value={formData.gstNo} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select type="text" name="state" value={formData.state} onChange={handleChange} className="form-select">
                    <option value="Uttar Pradesh (09)">Uttar Pradesh (09)</option>
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
                  </select>
                </div>
              </div>
            </div>

            <div className="items-section">
              <div className="item-section-heading-wrapper">
                <h3>Add New Product Items</h3>
                <button type="button" onClick={addItem} className="add-item-btn btn btn-primary">
                  <i className="fas fa-plus me-1"></i> Add New Product Item
                </button>
              </div>

              {formData.items.map((item, index) => (
                <div key={index} className="item-row details-row-container">
                  <div className="form-row details-row">
                    <div className="form-group">
                      <label>Barcode</label>
                      <input
                        type="text"
                        name="barcode"
                        value={item.barcode}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={item.brand}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        name="description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        name="category"
                        value={item.category}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-select"
                      >
                        <option value="General">General</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Grocery">Grocery</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Stock Type</label>
                      <select
                        name="stockType"
                        value={item.stockType}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-select"
                      >
                        <option value="General Goods">Goods</option>
                        <option value="Perishable">Perishable</option>
                        <option value="Fragile">Fragile</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Unit</label>
                      <input
                        type="text"
                        name="unit"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Rate</label>
                      <input
                        type="number"
                        name="rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>HSN</label>
                      <input
                        type="text"
                        name="hsn"
                        value={item.hsn}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>GST %</label>
                      <input
                        type="number"
                        name="gstPercent"
                        value={item.gstPercent}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Sale Price</label>
                      <input
                        type="number"
                        name="salePrice"
                        value={item.salePrice}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>MRP</label>
                      <input
                        type="number"
                        name="mrp"
                        value={item.mrp}
                        onChange={(e) => handleItemChange(index, e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="remove-item-btn btn btn-danger"
                    >
                      <i className="fas fa-trash-alt"></i> Remove Item
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="payment-wrapper">
              <div className="payment-section ms-auto">
                <div className="form-row">
                  <div className="form-group flex-row">
                    <label>Payment in Cash</label>
                    <input
                      type="number"
                      name="cash"
                      value={formData.payment.cash}
                      onChange={handlePaymentChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group flex-row">
                    <label>Payment in Card</label>
                    <input
                      type="number"
                      name="card"
                      value={formData.payment.card}
                      onChange={handlePaymentChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group flex-row">
                    <label>Payment in UPI</label>
                    <input
                      type="number"
                      name="upi"
                      value={formData.payment.upi}
                      onChange={handlePaymentChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group flex-row">
                    <label className='fw-bold'>Payment Total</label>
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
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save me-2"></i>Save Purchase
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-print me-2"></i>Save & Print
              </button>
              <button type="button" className="btn btn-danger">
                <i className="fas fa-times me-2"></i>Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/*
import React from 'react'
import { Link } from 'react-router-dom'

export const Purchase = () => {
  return (
    <div>
      <h1>Purchase</h1>
      <h2>Services</h2>
      <h2>Welcome to Purchase Services our Page </h2>
      
        <button><Link to="/inventory">Go to Inventory</Link></button>
        <br/>
        <button><Link to="/Login">Go to Login</Link></button>
    </div>
  );
};
*/