import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './axiosConfig.js';  // axios yapılandırmasını import edin

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
