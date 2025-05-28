/*
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './View.css';

export const View = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="view-container">
      <div className="header">
        <h1>View </h1>
        
        {/* Navigation Dropdown 
        <div className="dropdown">
          <button 
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {activeTab === 'sales' ? 'Sales View' : 'Purchase View'} ▼
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <Link 
                to="/sales-view" 
                className={`dropdown-item ${activeTab === 'sales' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('sales');
                  setShowDropdown(false);
                }}
              >
                Sales View
              </Link>
              
              <Link 
                to="/purchase-view" 
                className={`dropdown-item ${activeTab === 'purchase' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('purchase');
                  setShowDropdown(false);
                }}
              >
                Purchase View
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Additional navigation buttons 
      <div className="navigation-buttons">
        <button className="nav-btn">
          <Link to="/company">Go to Company</Link>
        </button>
        <button className="nav-btn">
          <Link to="/logout">Logout</Link>
        </button>
      </div>
    </div>
  );
};

*/








// pages/SalesView.jsx
import { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import './View.css';

 export const View = () => {
  const [activeTab, setActiveTab] = useState('onlineOrders');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Sample data from the image
  const data = [
    {
      product: 'US-CHIFF/DAF',
      code: '00002',
      quantity: '67,8255',
      size: 'M20',
      price: '610,855',
      details: 'N32 GTV',
      salePrice: '750,25',
      discount: '63,172',
      status: 'VA UZ'
    },
    {
      product: 'SPORT SALE 249',
      quantity: '249',
      price: '0',
      details: '1',
      type: 'PCS-PR',
      salePrice: '249',
      discount: '248'
    },
    {
      product: 'JCLSPORT T-SHIRT',
      quantity: '380',
      price: '0',
      details: '1',
      type: 'PCS-PR',
      salePrice: '380',
      discount: '380'
    }
  ];

  const columns = [
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'quantity', header: 'Qty' },
    { accessorKey: 'size', header: 'Size' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'details', header: 'Details' },
    { accessorKey: 'salePrice', header: 'Sale Price' },
    { accessorKey: 'discount', header: 'Discount' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'type', header: 'Type' }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
    <div className="sales-view-container">
      <div className="header-section">
        <h1>Sales View</h1>
        <div className="customer-info">
          <div className="info-row">
            <span className="label">Type</span>
            <span className="value">Sales</span>
            <span className="label">Ref</span>
          </div>
          <div className="info-row">
            <span className="label">Name</span>
            <span className="value">Call / Name A</span>
          </div>
          <div className="info-row">
            <span className="label">Mobile</span>
            <span className="value">5772759990</span>
          </div>
          <div className="info-row">
            <span className="label">Address</span>
          </div>
        </div>
      </div>

      <div className="tabs-section">
        <button 
          className={activeTab === 'onlineOrders' ? 'active' : ''}
          onClick={() => setActiveTab('onlineOrders')}
        >
          Online Orders
        </button>
        <button 
          className={activeTab === 'recent' ? 'active' : ''}
          onClick={() => setActiveTab('recent')}
        >
          Recent
        </button>
      </div>
      <div className="sales-table-section">
        <div className="table-header">
          <span>Sales</span>
          <span>Time</span>
          <span>Date</span>
          <span>Status</span>
          <span>GST No.</span>
          <span>State</span>
          <span>Unit / Product (G)</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="payment-section">
        <div className="payment-methods">
          <h3>Payment Method</h3>
          <div className="method-options">
            <label>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              Cash
            </label>
            <label>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Card
            </label>
            <label>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              UPI
            </label>
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-row">
            <span>Sold</span>
            <span>$56</span>
          </div>
          <div className="summary-row">
            <span>Recent</span>
            <span>$ 0 days</span>
          </div>
          <div className="summary-row">
            <span>Loyalty</span>
            <span>Balance</span>
          </div>
          <div className="summary-row">
            <span>Expense</span>
            <span>59</span>
          </div>
          <div className="summary-row">
            <span>Savings</span>
            <span>0</span>
          </div>
          <div className="summary-row">
            <span>Payment in Cash</span>
            <span>0</span>
          </div>
          <div className="summary-row">
            <span>Payment in Card</span>
            <span>0</span>
          </div>
          <div className="summary-row">
            <span>Payment in UPI</span>
            <span>590</span>
          </div>
          <div className="summary-row">
            <span>Change Given</span>
            <span>0</span>
          </div>
        </div>
      </div>
       <div className="action-buttons">
        <button className="save-btn">Save</button>
        <button className="save-next-btn">Save & Next</button>
        <button className="cancel-btn"> Cancel</button>
      </div>
    </div>
    <br/>
    <button><Link to="/company">Go to Company</Link></button>
    <br/>
     <button><Link to="/purchase">Go to Purchase</Link></button>
     <br/>
    <button><Link to="/Logout">Logout</Link></button>
    </>
  );
}



/*
import { useState } from 'react';
import './View.css';

export const PurchaseView = () => {
  const [purchases, setPurchases] = useState([
    { id: 1, date: '26-04-2025', name: 'Gpt', mobile: '(Utter Preview)', gstNo: '0', address: '16260', disc: '40.25', taxable: '10.25', c597: '0', cest: '0', cebs: '0', less: '0', total: '16,341', mode: '', pending: '', user: 'mmn_admin' },
    { id: 2, date: '26-04-2025', name: 'LXMI', mobile: '(Utter Preview)', gstNo: '0', address: '16345', disc: '0', taxable: '0', c597: '0', cest: '0', cebs: '0', less: '0', total: '18,345', mode: '', pending: '', user: 'mmn_admin' },
   { id: 3, date: '25-04-2025', name: ' ', mobile: '(Utter Preview)', gstNo: '0', address: '26250', disc: '0', taxable: '0', c597: '0', cest: '0', cebs: '0', less: '0', total: '26,250', mode: '', pending: '', user: 'mmn_admin' },
    // Add other purchase data here...
  ]);

  const totals = {
    disc: '305177.03',
    taxable: '0',
    usd: '0',
    cebs: '0',
    less: '2,80,291',
    total: '2,80,291',
    pending: '',
    collected: '280145.2'
  };

  return (
    <div className="purchase-view-container">
      <h1>Purchase View</h1>
      <div className="version">1.0</div>
      
      <div className="action-buttons">
        <button className="print-btn">Print</button>
        <button className="export-btn">Export Excel</button>
        <button className="report-btn">Excel Report</button>
      </div>
      
      <div className="table-container">
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Date</th>
              <th>Name mobile</th>
              <th>GSTNo.</th>
              <th>Address</th>
              <th>Disc</th>
              <th>Taxable</th>
              <th>0597 50571</th>
              <th>CEST</th>
              <th>CEBS</th>
              <th>Less</th>
              <th>Total</th>
              <th>Mode</th>
              <th>Pending</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={purchase.id}>
                <td>{index + 1}</td>
                <td>{purchase.date}</td>
                <td>{purchase.name} {purchase.mobile}</td>
                <td>{purchase.gstNo}</td>
                <td>{purchase.address}</td>
                <td>{purchase.disc}</td>
                <td>{purchase.taxable}</td>
                <td>{purchase.c597}</td>
                <td>{purchase.cest}</td>
                <td>{purchase.cebs}</td>
                <td>{purchase.less}</td>
                <td>{purchase.total}</td>
                <td>{purchase.mode}</td>
                <td>{purchase.pending}</td>
                <td>{purchase.user}</td>
                <td>
                  <button className="action-btn">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="totals-section">
        <h3>Total</h3>
        <div className="totals-grid">
          <div className="total-item">
            <span>Disc</span>
            <span>{totals.disc}</span>
          </div>
          <div className="total-item">
            <span>Taxable</span>
            <span>{totals.taxable}</span>
          </div>
          <div className="total-item">
            <span>USD</span>
            <span>{totals.usd}</span>
          </div>
          <div className="total-item">
            <span>CEBS</span>
            <span>{totals.cebs}</span>
          </div>
          <div className="total-item">
            <span>Less</span>
            <span>{totals.less}</span>
          </div>
          <div className="total-item">
            <span>Total</span>
            <span>{totals.total}</span>
          </div>
          <div className="total-item">
            <span>Pending</span>
            <span>{totals.pending}</span>
          </div>
          <div className="total-item">
            <span>Collected</span>
            <span>{totals.collected}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseView;
*/


























































































/*
//import React from 'react'
import { Link } from "react-router-dom";
export const View = () => {
  return (
    <>
      <h1>View</h1>
      <h2>Welcome to  View Page Show all Sales View Details Listing</h2>
      <div>
        <br/>
        <h3>Welcome to Show all Purchase View Details Listing</h3>
        <h3>Sales show analysis your web Application.</h3>
        <h3>Sales show analysis your web Application.</h3>
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