import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  // Close menu on window resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 d-flex justify-content-between">
      <Link className="navbar-brand fw-bold fs-4" to="/">NMM</Link>
      <button
        className="navbar-toggler menu"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={handleToggle}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse${menuOpen ? ' open' : ''}`} id="navbarNav" style={menuOpen ? { display: 'block' } : {}}>
        <ul className={`navbar-nav ms-auto mb-lg-0${menuOpen ? ' open' : ''}`.trim()} style={menuOpen ? { display: 'flex', flexDirection: 'column' } : {}}>
          <li className="nav-item"><NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-tachometer-alt me-2"></i>Dashboard</NavLink></li>
          <li className="nav-item"><NavLink to="/purchase" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-shopping-cart me-2"></i>Purchase</NavLink></li>
          <li className="nav-item"><NavLink to="/inventory" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-boxes me-2"></i>Inventory</NavLink></li>
          <li className="nav-item"><NavLink to="/sales" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-cash-register me-2"></i>Sales</NavLink></li>
          <li className="nav-item"><NavLink to="/billprint" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-file-invoice-dollar me-2"></i>BillPrint</NavLink></li>
          <li className="nav-item"><NavLink to="/view" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-eye me-2"></i>View</NavLink></li>
          <li className="nav-item"><NavLink to="/company" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-building me-2"></i>Company</NavLink></li>
          <li className="nav-item"><NavLink to="/settings" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-cog me-2"></i>Settings</NavLink></li>
          <li className="nav-item"><NavLink to="/login" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-sign-in-alt me-2"></i>Login</NavLink></li>
          <li className="nav-item"><NavLink to="/signup" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-user-plus me-2"></i>Signup</NavLink></li>
          <li className="nav-item"><NavLink to="/logout" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={handleNavClick}><i className="fas fa-sign-out-alt me-2"></i>Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};
