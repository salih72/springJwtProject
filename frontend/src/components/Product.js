import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  if (!product) {
    return null;
  }

  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <strong>Price: </strong>${product.price}
          </Card.Text>
          <Button variant="primary" onClick={handleViewDetails}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ProductList = ({ products = [] }) => {
  if (products.length === 0) {
    return <Container className="mt-5"><p>No products available</p></Container>;
  }

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
