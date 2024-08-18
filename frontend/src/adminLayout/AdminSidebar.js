import React from 'react';
import { Link } from 'react-router-dom';  // Link bileşeni import edildi
import styles from './AdminSidebar.module.css';  // CSS Modules kullanımı

const AdminSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li> {/* <a> yerine <Link> kullanıldı */}
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/adminPanel">Admin Panel</Link></li>
        <li><Link to="/broadcast">Broadcast</Link></li> {/* Broadcast sayfasına yönlendiren buton */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
