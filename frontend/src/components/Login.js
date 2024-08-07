import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router kullanıyorsanız

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // React Router ile yönlendirme

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
        console.log(response.data);
        // JWT token'i localStorage'a kaydetme
        localStorage.setItem('token', response.data.token);
        // Yönlendirme
        navigate('/dashboard'); // Örneğin, kullanıcıyı dashboard sayfasına yönlendirme
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
