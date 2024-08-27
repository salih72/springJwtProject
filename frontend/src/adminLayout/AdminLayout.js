import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';


const AdminLayout = () => {
  return (
    <div className="adminLayout">
      <AdminNavbar />
      <div className="admin-layout-content">
        <AdminSidebar />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
