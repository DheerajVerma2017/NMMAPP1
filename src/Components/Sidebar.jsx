import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="sidebar-hamburger d-md-none" onClick={() => setOpen(!open)} aria-label="Open sidebar">
        <span className="sidebar-hamburger-bar"></span>
        <span className="sidebar-hamburger-bar"></span>
        <span className="sidebar-hamburger-bar"></span>
      </button>
      <aside className={`sidebar d-flex flex-column bg-primary text-white vh-100 p-0${open ? ' sidebar-open' : ''}`}> 
        <div className="sidebar-title fw-bold fs-4 py-4 px-3 border-bottom border-light">NMM</div>
        <nav className="sidebar-nav nav flex-column mt-3">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-tachometer-alt me-2"></i>Dashboard
          </NavLink>
          <NavLink to="/purchase" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-shopping-cart me-2"></i>Purchase
          </NavLink>
          <NavLink to="/inventory" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-boxes me-2"></i>Inventory
          </NavLink>
          <NavLink to="/sales" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-cash-register me-2"></i>Sales
          </NavLink>
          <NavLink to="/billprint" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-file-invoice-dollar me-2"></i>BillPrint
          </NavLink>
          <NavLink to="/view" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-eye me-2"></i>View
          </NavLink>
          <NavLink to="/company" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-building me-2"></i>Company
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-cog me-2"></i>Settings
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-user-plus me-2"></i>Signup
          </NavLink>
          <NavLink to="/logout" className={({ isActive }) => `nav-link ${isActive ? ' active bg-white text-dark' : ''}`} onClick={() => setOpen(false)}>
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </NavLink>
        </nav>
      </aside>
      {open && <div className="sidebar-backdrop d-md-none" onClick={() => setOpen(false)}></div>}
    </>
  );
};
