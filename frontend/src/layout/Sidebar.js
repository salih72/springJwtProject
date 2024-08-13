import React from 'react';
import styles from './Sidebar.module.css';  // CSS Modules kullanımı

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/products">Products</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
