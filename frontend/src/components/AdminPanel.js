import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', credentials)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        
        // Token'ı decode et ve rol kontrolü yap
        const decodedToken = jwtDecode(token);
        console.log(token);
        console.log(decodedToken);
        if (decodedToken.role && decodedToken.role.includes('ROLE_ADMIN')) {
          navigate('/adminPanel');  // Admin rolü varsa adminPanel sayfasına yönlendir
        } else {
          setAlert({ show: true, message: 'You do not have permission to access the admin panel.', variant: 'warning' });
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        setAlert({ show: true, message: 'Login failed. Please try again.', variant: 'danger' });
      });
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Container className="mt-5">
      <h2>ADMIN PANEL</h2>
    </Container>
  );
};

export default LoginForm;
