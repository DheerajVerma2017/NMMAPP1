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
    <>
<div className="form-section">
    {/* <h3 className="form-header">Sales</h3> */}
      <div className="form-columns-container">
        {/* Column 1 */}
      <div className="form-column">
      <div className="form-group">
        <label>Type</label>
        <select type="text" name="type" value={formData.type} onChange={handleChange}>
        <option value="Sales">Sales</option>
                <option value="Return">Return</option>
                <option value="Exchange">Exchange</option>
                <option value="Credit Note">Credit Note</option>
                <option value="Debit Note">Debit Note</option>
                <option value="Gift Voucher">Gift Voucher</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Ref.</label>
        <input type="text" name="refNo" value={formData.ref} onChange={handleChange} />
      </div>
      
      <div className="form-group">
         <label>Ship</label>
        <input type="text" name="shipTo" value={formData.shipTo} onChange={handleChange} />
      </div>
    </div>
    
    {/* Column 2 */}
    <div className="form-column">
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label>Mobile</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
      </div>
      
      <div className="form-group-address">
          <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} />

      </div>
    </div>
    
    {/* Column 3 */}
    <div className="form-column">
      <div className="form-group">
        <label>Invoice</label>
        <input type="text" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} />
      </div>
      
      {/* <div className="form-group">
        <label>GST</label>
        <input type="text" name="gstNo" value={formData.gstNo} onChange={handleChange} />
      </div> */}
      <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
      
      <div className="form-group">
        <label>State</label>
        <select name="state" value={formData.state} onChange={handleChange}>
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
    </div>
  </div>
 </div>
   <div className="items-section">
          <div className="section-header">
            <h3>Add New ITEMS</h3>
            <div className="action-buttons">
               <button type="button" onClick={addItem} className="add-item-btn-sales">
                + Add New Item
              </button>
              <button type="button" onClick={importFromExcel} className="icon-btn">
                <FaFileExcel />EXCEL IMPORT FILE
              </button>
            </div>
          </div>
           <div className="items-table">
           <div className="table-header">
              <div>#</div>
              <div>Barcode</div>
              <div>Description</div>
              <div>Category</div>
              <div>Unit</div>
              <div>Qty</div>
              <div>Gross</div>
              <div>Sale Price</div>
              <div>HSN</div>
              <div>GST%</div>
              <div>Action</div>
            </div>
            {formData.items.map((item, index) => (
              <div key={index} className="table-row">
                <div>{index + 1}</div>
                <div>
                  <input
                    type="text"
                    name="barcode"
                    value={item.barcode}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>
                  <select
                    name="category"
                    value={item.category}
                    onChange={(e) => handleItemChange(index, e)}
                  >
                    <option value="General">General</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Fashion">Fashion</option>
                    <option value="WomenWear">Women Wear</option>
                    <option value="MenWear" >Men Wear</option>
                    <option value="FootWear">Foot Wear</option>
                    <option value="KidsWear">Kids Wear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    name="unit"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>{item.gross.toFixed(2)}</div>
                <div>
                  <input
                    type="number"
                    name="salePrice"
                    min="0"
                    step="0.01"
                    value={item.salePrice}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="hsn"
                    value={item.hsn}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="gstPercent"
                    min="0"
                    max="100"
                    value={item.gstPercent}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="payment-section">
          <div className="section-header">
            <h3>PAYMENT</h3>
            <div className="hold-actions">
              <button type="button" onClick={holdCurrentItems} className="hold-btn">
                <FaPause /> Hold ({formData.holdItems.length})
              </button>
              <button type="button" onClick={viewHoldItems} className="view-btn">
                <FaEye /> View
              </button>
            </div>
          </div>

          <div className="payment-grid">
            <div className="payment-row">
              <label>Expense</label>
              <div className="payment-input">
                <FaRupeeSign />
                <input
                  type="number"
                  name="expense"
                  min="0"
                  value={formData.payment.expense}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>

            <div className="payment-row">
              <label>Savings</label>
              <div className="payment-input">
                <FaRupeeSign />
                <input
                  type="number"
                  name="savings"
                  min="0"
                  value={formData.payment.savings}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>

            <div className="payment-row total-row">
              <label>Invoice Total</label>
              <div className="payment-value">
                <FaRupeeSign /> {formData.payment.total.toFixed(2)}
              </div>
            </div>

            <div className="payment-row">
              <label>Cash</label>
              <div className="payment-input">
                <FaRupeeSign />
                <input
                  type="number"
                  name="cash"
                  min="0"
                  value={formData.payment.cash}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>

            <div className="payment-row">
              <label>Card</label>
              <div className="payment-input">
                <FaCreditCard />
                <input
                  type="number"
                  name="card"
                  min="0"
                  value={formData.payment.card}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>

            <div className="payment-row">
              <label>UPI</label>
              <div className="payment-input">
                <FaQrcode />
                <input
                  type="number"
                  name="upi"
                  min="0"
                  value={formData.payment.upi}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>

            {/* <div className="payment-row">
              <label>Change Given</label>
              <div className="payment-input">
                <FaRupeeSign />
                <input
                  type="number"
                  name="change"
                  min="0"
                  value={formData.payment.change}
                  onChange={handlePaymentChange}
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Sale
          </button>
          <button type="submit" className="submit-btn">
            Save & Print
          </button>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
    
    </>
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