import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import AdminPanel from './components/AdminPanel'; 
import HomePage from './components/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './components/ProductAdmin'
import ProductAdmin from './components/Product';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<ProductAdmin />} />
        <Route path="/productsAdmin" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
