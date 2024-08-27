import React from 'react';
import { Link } from 'react-router-dom';


const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li><Link to="/productsAdmin">Products</Link></li>
        <li><Link to="/broadcast">Broadcast</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
