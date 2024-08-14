import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cart from './Cart';  // Sepet bileşenini import ediyoruz

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Col md={3} sm={6} xs={12} className="mb-4" key={product.id}>
            <Card className="shadow-sm h-100 d-flex flex-column">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column p-2">
                <Card.Title className="text-center" style={{ fontSize: '1.1rem' }}>
                  {product.name}
                </Card.Title>
                <Card.Text className="text-muted text-truncate" style={{ fontSize: '0.9rem' }}>
                  {product.description}
                </Card.Text>
                <Card.Text className="mt-auto text-center" style={{ fontSize: '0.9rem' }}>
                  <strong>Price: </strong>${product.price}
                </Card.Text>
                <Button
                  variant="success"
                  size="sm"
                  className="mt-3"
                  style={{ width: '100%' }}
                  onClick={() => handleAddToCart(product)}
                >
                  Ürünü Sepete Ekle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Sepet bileşenini sayfada göstermek için ekledik */}
      <Cart cartItems={cart} />
    </Container>
  );
};

export default Product;
