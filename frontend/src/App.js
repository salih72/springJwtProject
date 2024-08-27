import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import ProductsAdmin from './components/ProductsAdmin';
import Product from './components/Product';
import Layout from './layout/Layout';
import AdminLayout from './adminLayout/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout/Layout.css';
import './adminLayout/AdminLayout.css';
import Broadcast from './components/Broadcast';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Başlangıçta "/" pathine geldiğinde "/login"e yönlendirme yap */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />

        <Route path="/" element={<Layout />}>
          <Route path="products" element={<Product />} />
          <Route path="/products" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
        </Route>      

        <Route path="/productsAdmin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<ProductsAdmin />} />
        </Route>

        <Route path="/broadcast" element={<Broadcast />} />
        
        {/* Tanımlanmamış herhangi bir path için yönlendirme yapılır */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
