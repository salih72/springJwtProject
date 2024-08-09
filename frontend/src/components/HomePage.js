import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hoş Geldiniz!</h1>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>
          Giriş Yap
        </Link>
        <Link to="/register" style={styles.button}>
          Kayıt Ol
        </Link>
        <Link to="/products" style={styles.button}>
          Ürünlere Göz At
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
};

export default HomePage;
