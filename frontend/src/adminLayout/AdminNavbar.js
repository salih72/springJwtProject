// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MKK KAFE</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Register</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
