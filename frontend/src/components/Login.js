import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { jwtDecode } from  'jwt-decode';

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
  
        if (decodedToken.role && decodedToken.role.includes('ADMIN')) {
          navigate('/productsAdmin');  // Admin rolü varsa adminPanel sayfasına yönlendir
        } else {
          navigate('/products'); // Admin rolü yoksa products sayfasına yönlendir
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
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row className="mt-3">
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" className="w-100" onClick={handleRegisterRedirect}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
