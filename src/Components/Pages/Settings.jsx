// Settings.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Settings.css"; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Settings = () => {
  const settingsData = [
  { label: "Allow Duplicate Items in Inventory", type: "select" },
  { label: "Allow Credit Note in Sales", type: "select" },
  { label: "Allow Out of Book Sales", type: "select" },
  { label: "Gross Total", type: "select" },
  { label: "Gross G.T. addons", type: "select" },
  { label: "Manufacturing", type: "select" },
  { label: "HSN Invoice Number with Delivery Note", type: "select" },
  { label: "Hide Customer Name", type: "select" },
  { label: "Fill Category (on Summary)", type: "select" },
  { label: "Invoice Page Size", type: "select" },
  { label: "Invoice Print Option", type: "input" },
  { label: "Invoice Print Paper (A4/ POS)", type: "select" },
  { label: "Invoice Print Paper (B2B)", type: "select" },
  { label: "Invoice Print Paper (B2C)", type: "select" },
  { label: "Invoice Print Paper (EXP)", type: "select" },
  { label: "Merge Invoice Copies", type: "select" },
  { label: "Merge Invoice Customers", type: "select" },
  { label: "Send Invoice Email", type: "select" },
  { label: "Send Invoice Format", type: "select" },
  { label: "Show Brand", type: "select" },
  { label: "Show Item Color", type: "select" },
  { label: "Show Item Category", type: "select" },
  { label: "Show Item Description", type: "select" },
  { label: "Show Item MRP", type: "select" },
  { label: "Show Item Rate", type: "select" },
  { label: "Show Item Size", type: "select" },
  { label: "Show Item Taxable Amount", type: "select" },
  { label: "Show Item Tax %", type: "select" },
  { label: "Show Item Total", type: "select" },
  { label: "Show Item UQC", type: "select" },
  { label: "Show TTime Barcode", type: "select" },
];


  const SettingRow = ({ label, type }) => (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body d-flex flex-column gap-2">
          <label className="form-label fw-semibold mb-1">{label}</label>
          {type === "select" ? (
            <select className="form-select">
              <option>Yes</option>
              <option>No</option>
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              placeholder="Enter value"
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4 settings-container">
      <h1 className="mb-4 text-center settings-title">
        <i className="fas fa-cogs me-2 text-primary"></i>Settings
      </h1>
      <div className="row g-4">
        {settingsData.map((setting, index) => (
          <SettingRow key={index} {...setting} />
        ))}
      </div>
      <div className="settings-savebar bg-white shadow-sm rounded-pill d-flex justify-content-center align-items-center gap-3 py-3 mt-5 sticky-bottom">
        <button className="btn btn-success px-4 rounded-pill">
          <i className="fas fa-save me-2"></i>Save Settings
        </button>
        <Link to="/company" className="btn btn-outline-primary px-4 rounded-pill">
          <i className="fas fa-building me-2"></i>Go to Company
        </Link>
        <Link to="/login" className="btn btn-outline-secondary px-4 rounded-pill">
          <i className="fas fa-sign-in-alt me-2"></i>Go to Login
        </Link>
      </div>
    </div>
  );
};