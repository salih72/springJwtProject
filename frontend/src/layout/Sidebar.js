import React from 'react';
import styles from './Sidebar.module.css';  // CSS Modules kullanımı

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/admin">Admin Panel</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
