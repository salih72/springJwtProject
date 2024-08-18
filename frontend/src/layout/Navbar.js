import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // JWT token'ı localStorage'dan al
  const token = localStorage.getItem('token');

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    // localStorage'dan token'ı sil
    localStorage.removeItem('token');
    // Kullanıcıyı login sayfasına yönlendir
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MKK KAFE</Link>
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
