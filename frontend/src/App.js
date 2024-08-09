import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import HomePage from './components/HomePage';
import ProductAdmin from './components/ProductAdmin';
import Product from './components/Product';
import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout/Layout.css'
import './layout/Sidebar.module.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout bileşenini kullanarak tüm sayfaları sarmalayın */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="productsAdmin" element={<ProductAdmin />} />
          <Route path="products" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
