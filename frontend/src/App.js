import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import ProductsAdmin from './components/ProductsAdmin';
import Product from './components/Product';
import Layout from './layout/Layout';
import AdminLayout from './adminLayout/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout/Layout.css';
import './adminLayout/AdminSidebar.module.css';
import './adminLayout/AdminLayout.css';
import Broadcast from './components/Broadcast';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Product />} /> {/* ProductAdmin yerine Product */}
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<RegisterForm />} />
          <Route path="products" element={<Product />} />
          <Route path="productsAdmin" element={<ProductsAdmin />} />
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/productsAdmin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />        
        </Route>      

        {/* Route for ProductsAdmin with AdminLayout */}
        <Route path="/productsAdmin" element={<AdminLayout />}>
          <Route index element={<ProductsAdmin />} />
        </Route>
        <Route path="*" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
