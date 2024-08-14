import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    const token = localStorage.getItem('token');
  
    axios.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setProducts(products.filter(product => product.id !== id));
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  const handleAddProduct = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('JWT token bulunamadı');
      return;
    }
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    axios.post('/api/products', newProduct, config)
      .then(response => {
        setProducts([...products, response.data]);
        resetForm();
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      image: ''
    });
    setShowModal(false);
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
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
                <Card.Title className="text-center" style={{ fontSize: '1.1rem' }}>{product.name}</Card.Title>
                <Card.Text className="text-muted text-truncate" style={{ fontSize: '0.9rem' }}>{product.description}</Card.Text>
                <Card.Text className="mt-auto text-center" style={{ fontSize: '0.9rem' }}>
                  <strong>Price: </strong>${product.price}
                </Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="primary" size="sm" onClick={() => handleViewDetails(product.id)}>
                    View
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
          Add Product
        </Button>
      </div>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductsAdmin;
