import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import ProductAdmin from './components/ProductAdmin';
import Product from './components/Product';
import Layout from './layout/Layout';
import AdminLayout from './adminLayout/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout/Layout.css';
import './adminLayout/AdminSidebar.module.css';
import './adminLayout/AdminLayout.css';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // JWT token'ını localStorage'dan al
    if (token) {
      const decodedToken = jwtDecode(token); // Token'ı decode et
      setUserRole(decodedToken.role); // Rolü belirle
    }
  }, []);

  return (
    <Router>
      <Routes>
        {userRole === 'ADMIN' ? (
         <Route path="/" element={<AdminLayout />}>
            <Route index element={<Product />} />
            <Route path="productsAdmin" element={<ProductAdmin />} />
            <Route path="products" element={<Product />} />
          </Route>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductAdmin />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="products" element={<Product />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;