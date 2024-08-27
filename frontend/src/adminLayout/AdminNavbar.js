import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css'; 

const AdminNavbar = () => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8081/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        localStorage.removeItem('token');

        navigate('/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };
  

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
      
      <img src="../MKKLogo.png" alt='Merkezi Kayıt Kuruluşu Logo' width="100px" height="80px"/>
      </div>
      <ul className="navbar-links">
        {token ? (
          <li><button className="logout-button" onClick={handleLogout}>Çıkış Yap</button></li>

        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
            
          </>
        )}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
