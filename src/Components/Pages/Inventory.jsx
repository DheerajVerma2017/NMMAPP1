import { useState, setInventory, useEffect } from 'react';
import { FaPrint, FaFileExcel, FaSearch, FaSave, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Inventory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Inventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, description: 'R SHORT W', category: 'Women active wear', location: '2 day', status: 'OK', barcode: 'A1045', city: '61 PC3', stock: 180 },
    { id: 2, description: 'CLOTH SHORT', category: 'MENACTIVE VICAR', location: '2 day', status: 'OK', barcode: 'A1045', city: '41 PC3', stock: 200 },
    { id: 3, description: 'L FROCK', category: 'Women active wear', location: '5 day', status: 'OK', barcode: 'A1045', city: '6 PC3', stock: 400 },
    { id: 4, description: 'KID TOP SET', category: 'Kids Active Wear', location: '5 day', status: 'OK', barcode: 'A1045', city: '16 PC3', stock: 125 },
    { id: 5, description: 'CAPRI MEMS', category: 'MENACTIVE VICAR', location: '6 day', status: 'OK', barcode: 'A1045', city: '8 PC3', stock: 535 },
    { id: 6, description: 'CARGO WOMEN', category: 'Women active wear', location: '15 day', status: 'OK', barcode: 'A1045', city: '12 PC3', stock: 680 },
    { id: 7, description: 'LOWER SALE W 249', category: 'MENACTIVE VICAR', location: '15 day', status: 'OK', barcode: 'A1045', city: '4 PC3', stock: 249 },
    { id: 8, description: 'SHIRT MEM WS', category: 'MENACTIVE VICAR', location: '16 day', status: 'OK', barcode: 'A1045', city: '9 PC3', stock: 600 },
    { id: 9, description: 'JK SOCKS 149', category: 'Accessories', location: '16 day', status: 'OK', barcode: 'A1045', city: '6 PC3', stock: 159 },
    { id: 10, description: 'KID JEANS', category: 'Kid choice wear', location: '15 day', status: 'OK', barcode: 'A1045', city: '29 PC3', stock: 300 },
    { id: 11, description: 'PACK T-SHIRT', category: 'MENACTIVE VICAR', location: '26 day', status: 'OK', barcode: 'A1045', city: '5 PC3', stock: 400 },
    { id: 12, description: 'LOWER SALE 249', category: 'MENACTIVE VICAR', location: '2 day', status: 'OK', barcode: 'A1045', city: '18 PC3', stock: 249 },
    { id: 13, description: 'LOWER SALE 349', category: 'MENACTIVE VICAR', location: '15 day', status: 'OK', barcode: 'A1045', city: '118 PC3', stock: 349 },
    { id: 14, description: 'GROP TOP', category: 'Women active wear', location: 'SAMARA', status: 'OK', barcode: 'A1045', city: '44 PC3', stock: 199 },
    { id: 15, description: 'Kids Lower', category: 'General', location: 'PL', status: 'OK', barcode: 'A1045', city: '13 PC3', stock: 150 },
    { id: 16, description: 'Kids Prods', category: 'Kids Active Wear', location: '36 day', status: 'OK', barcode: 'A1045', city: '6 PC3', stock: 150 },
    { id: 17, description: 'Kids Set Q-3', category: 'Kids Active Wear', location: '36 day', status: 'OK', barcode: 'A1045', city: '6 PC3', stock: 250 },
    { id: 18, description: 'Night Shift', category: 'General', location: '36 day', status: 'OK', barcode: 'A1045', city: '14 PC3', stock: 500 }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterStock, setFilterStock] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const categories = ['All', ...new Set(inventory.map(item => item.category))];
  const statuses = ['All', ...new Set(inventory.map(item => item.status))];

  const handlePrint = () => {
    window.print();
  };

  const exportToExcel = () => {
    // Implement Excel export functionality
    console.log('Exporting to Excel');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredInventory = inventory
    .filter(item => {
      const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.barcode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
      const matchesStock = filterStock === 'All' || 
                         (filterStock === 'Low' && item.stock < 50) || 
                         (filterStock === 'Expiring' && item.location.includes('day') && parseInt(item.location) < 10);

      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4 text-center">Inventory</h1>
          <div className="action-buttons d-flex gap-2 mb-3">
            <button onClick={exportToExcel} className="btn btn-success">
              <i className="fas fa-file-excel me-1"></i>Excel Report
            </button>
            <button onClick={handlePrint} className="btn btn-primary">
              <i className="fas fa-print me-1"></i>Print Report
            </button>
            <button onClick={handlePrint} className="btn btn-info">
              <i className="fas fa-save me-1"></i>Save
            </button>
            <button className="btn btn-warning">
              <i className="fas fa-barcode me-1"></i>Barcode
            </button>
          </div>
          <div className="search-filter row mb-3">
            <div className="col-md-4 mb-2">
              <div className="input-group">
                <span className="input-group-text"><FaSearch /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search description or barcode..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="col-md-2 mb-2">
              <div className="form-group">
                <label>Category:</label>
                <select className="form-control" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-2 mb-2">
              <div className="form-group">
                <label>Status:</label>
                <select className="form-control" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-2 mb-2">
              <div className="form-group">
                <label>Stock:</label>
                <select className="form-control" value={filterStock} onChange={(e) => setFilterStock(e.target.value)}>
                  <option value="All">All Items</option>
                  <option value="Low">Low Stock</option>
                  <option value="Expiring">Expiring Soon</option>
                </select>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>#</th>
                  <th onClick={() => handleSort('description')}>Description</th>
                  <th onClick={() => handleSort('category')}>Category</th>
                  <th onClick={() => handleSort('location')}>Location/Ageing</th>
                  <th onClick={() => handleSort('status')}>Status</th>
                  <th onClick={() => handleSort('barcode')}>Barcode</th>
                  <th onClick={() => handleSort('city')}>City</th>
                  <th onClick={() => handleSort('stock')}>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id} className={item.stock < 50 ? 'low-stock' : ''}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.location}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.barcode}</td>
                    <td>{item.city}</td>
                    <td>{item.stock}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-1">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-danger btn-sm">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-section mt-4">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="card text-white bg-primary">
                  <div className="card-body">
                    <h5 className="card-title">Total Items</h5>
                    <p className="card-text">{inventory.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-white bg-danger">
                  <div className="card-body">
                    <h5 className="card-title">Low Stock Items</h5>
                    <p className="card-text">{inventory.filter(item => item.stock < 50).length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-white bg-warning">
                  <div className="card-body">
                    <h5 className="card-title">Expiring Soon</h5>
                    <p className="card-text">{inventory.filter(item => item.location.includes('day') && parseInt(item.location) < 10).length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-white bg-success">
                  <div className="card-body">
                    <h5 className="card-title">Total Stock Value</h5>
                    <p className="card-text">₹{inventory.reduce((sum, item) => sum + item.stock, 0)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary"><Link to="/sales" className="text-white"><i className="fas fa-shopping-cart me-1"></i>Go to Sales</Link></button>
            <button className="btn btn-danger"><Link to="/Logout" className="text-white"><i className="fas fa-sign-out-alt me-1"></i>Logout</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};



/*
//import React from "react";
//import axios from "axios";
//import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Inventory = () => {
  return (
    <>
    <div>
      <h1>Inventory</h1>
      <h2> Welcome to inventory Services page </h2>
       <button><Link to="/sales">Go to Sales</Link></button>
      <br></br>
     <button><Link to="/Logout">Logout</Link></button>
     </div>
    </>
  );
};

*/