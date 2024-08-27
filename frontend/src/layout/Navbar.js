import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
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
        // Token'ı localStorage'dan kaldırma
        localStorage.removeItem('token');
  
        // Kullanıcıyı login sayfasına yönlendirme
        navigate('/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <img src="../MKKLogo.png" alt='Merkezi Kayıt Kuruluşu Logo' width="80px" height="120px"/>
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

export default Navbar;
