import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import AdminPanel from './components/AdminPanel'; 
import HomePage from './components/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './components/Product'
import ProductAdmin from './components/ProductAdmin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<Product />} />
        <Route path="/productsAdmin" element={<ProductAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
