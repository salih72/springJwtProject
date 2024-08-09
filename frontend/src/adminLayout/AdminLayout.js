import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import Navbar from './AdminNavbar';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
