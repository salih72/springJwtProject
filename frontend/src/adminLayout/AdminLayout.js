import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';


const AdminLayout = () => {
  return (
    <div className="layout">
      <AdminNavbar />
      <div className="layout-content">
        <AdminSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
