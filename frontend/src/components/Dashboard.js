import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Token kontrolü
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Token'i her isteğe ekleme
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default Dashboard;
