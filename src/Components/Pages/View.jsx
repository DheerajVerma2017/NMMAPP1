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
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-body">
              <h1 className="card-title mb-4 text-center">Sales View</h1>
              <div className="customer-info mb-3">
                <div className="row">
                  <div className="col-md-3"><span className="fw-bold">Type:</span> Sales</div>
                  <div className="col-md-3"><span className="fw-bold">Ref:</span></div>
                  <div className="col-md-3"><span className="fw-bold">Name:</span> Call / Name A</div>
                  <div className="col-md-3"><span className="fw-bold">Mobile:</span> 5772759990</div>
                </div>
                <div className="row"><div className="col-12"><span className="fw-bold">Address:</span></div></div>
              </div>
              <div className="mb-3">
                <button className={`btn btn-outline-primary me-2${activeTab === 'onlineOrders' ? ' active' : ''}`} onClick={() => setActiveTab('onlineOrders')}>
                  <i className="fas fa-shopping-cart me-1"></i>Online Orders
                </button>
                <button className={`btn btn-outline-secondary${activeTab === 'recent' ? ' active' : ''}`} onClick={() => setActiveTab('recent')}>
                  <i className="fas fa-clock me-1"></i>Recent
                </button>
              </div>
              <div className="table-responsive mb-4">
                <table className="table table-bordered table-striped">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Payment Method</h5>
                  <div className="d-flex gap-3 mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                      <label className="form-check-label">Cash</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                      <label className="form-check-label">Card</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                      <label className="form-check-label">UPI</label>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-3"><span className="fw-bold">Sold:</span> $56</div>
                    <div className="col-md-3"><span className="fw-bold">Recent:</span> $0 days</div>
                    <div className="col-md-3"><span className="fw-bold">Loyalty:</span> Balance</div>
                    <div className="col-md-3"><span className="fw-bold">Expense:</span> 59</div>
                    <div className="col-md-3"><span className="fw-bold">Savings:</span> 0</div>
                    <div className="col-md-3"><span className="fw-bold">Payment in Cash:</span> 0</div>
                    <div className="col-md-3"><span className="fw-bold">Payment in Card:</span> 0</div>
                    <div className="col-md-3"><span className="fw-bold">Payment in UPI:</span> 590</div>
                    <div className="col-md-3"><span className="fw-bold">Change Given:</span> 0</div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-success"><i className="fas fa-save me-1"></i>Save</button>
                <button className="btn btn-primary"><i className="fas fa-arrow-right me-1"></i>Save & Next</button>
                <button className="btn btn-danger"><i className="fas fa-times me-1"></i>Cancel</button>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-secondary">
                  <i className="fas fa-building me-1"></i>
                  <Link to="/company" className="text-white text-decoration-none">Go to Company</Link>
                </button>
                <button className="btn btn-info">
                  <i className="fas fa-shopping-cart me-1"></i>
                  <Link to="/purchase" className="text-white text-decoration-none">Go to Purchase</Link>
                </button>
                <button className="btn btn-danger">
                  <i className="fas fa-sign-out-alt me-1"></i>
                  <Link to="/Logout" className="text-white text-decoration-none">Logout</Link>
                </button>
              </div>
              <div className="action-buttons">
                <button className="print-btn"><i className="fas fa-print me-1"></i>Print</button>
                <button className="export-btn"><i className="fas fa-file-excel me-1"></i>Export Excel</button>
                <button className="report-btn"><i className="fas fa-file-alt me-1"></i>Excel Report</button>
              </div>
              <div className="table-responsive mb-4">
                <table className="table table-bordered table-striped">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                        <td>
                          <button className="btn btn-warning btn-sm me-1"><i className="fas fa-edit"></i></button>
                          <button className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Payment Method</h5>
                  <div className="d-flex gap-3 mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                      <label className="form-check-label">Cash</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                      <label className="form-check-label">Card</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                      <label className="form-check-label">UPI</label>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-3"><span className="fw-bold">Sold:</span> $56</div>
                    <div className="col-md-3"><span className="fw-bold">Recent:</span> $0 days</div>
                    <div className="col-md-3"><span className="fw-bold">Loyalty:</span> Balance</div>
                    <div className="col-md-3"><span className="fw-bold">Expense:</span> 59</div>
                    <div className="col-md-3"><span className="fw-bold">Savings:</span> 0</div>
                    <div className="col-md-3"><span className="fw-bold">Payment in Cash:</span> 0</div>
                    <div className="col-md-3"><span className="fw-bold">Payment in Card:</span> 0</div>
                    <div className="col-md-3"><span className="fw-bold">Payment in UPI:</span> 590</div>
                    <div className="col-md-3"><span className="fw-bold">Change Given:</span> 0</div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-success"><i className="fas fa-save me-1"></i>Save</button>
                <button className="btn btn-primary"><i className="fas fa-arrow-right me-1"></i>Save & Next</button>
                <button className="btn btn-danger"><i className="fas fa-times me-1"></i>Cancel</button>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-secondary">
                  <i className="fas fa-building me-1"></i>
                  <Link to="/company" className="text-white text-decoration-none">Go to Company</Link>
                </button>
                <button className="btn btn-info">
                  <i className="fas fa-shopping-cart me-1"></i>
                  <Link to="/purchase" className="text-white text-decoration-none">Go to Purchase</Link>
                </button>
                <button className="btn btn-danger">
                  <i className="fas fa-sign-out-alt me-1"></i>
                  <Link to="/Logout" className="text-white text-decoration-none">Logout</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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