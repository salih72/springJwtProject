import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // JWT token'ı localStorage'dan alın

    axios.get('/api/products', {
      headers: {
        Authorization: `Bearer ${token}` // Token'ı Authorization başlığı altında gönderin
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
    const token = localStorage.getItem('token'); // JWT token'ı localStorage'dan alın
  
    axios.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Token'ı Authorization başlığı altında gönderin
      }
    })
    .then(() => {
      setProducts(products.filter(product => product.id !== id));
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  const handleAddOrUpdateProduct = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('JWT token bulunamadı');
      return;
    }
  
    console.log('JWT token:', token);
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    if (editMode && currentProduct) {
      axios.put(`/api/products/${currentProduct.id}`, newProduct, config)
        .then(response => {
          setProducts(products.map(product =>
            product.id === currentProduct.id ? response.data : product
          ));
          resetForm();
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    } else {
      axios.post('/api/products', newProduct, config)
        .then(response => {
          setProducts([...products, response.data]);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    }
  };
  
  

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setNewProduct(product);
    setEditMode(true);
    setShowModal(true);
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
    setEditMode(false);
    setCurrentProduct(null);
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container className="mt-5">
      <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
        Add Product
      </Button>
      <Row>
        {products.map((product) => (
          <Col md={4} className="mb-4" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>Price: </strong>${product.price}
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(product.id)}>
                  View Details
                </Button>
                <Button variant="warning" onClick={() => handleEditProduct(product)} className="ml-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)} className="ml-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Product' : 'Add New Product'}</Modal.Title>
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
          <Button variant="primary" onClick={handleAddOrUpdateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductAdmin;
