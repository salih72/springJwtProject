import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/adminPanel">Admin Panel</Link></li>
        <li><Link to="/broadcast">Broadcast</Link></li> {/* Broadcast sayfasına yönlendiren buton */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
