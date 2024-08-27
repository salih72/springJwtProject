import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Cart.css'; // Yeni CSS'i yüklemek için

const Cart = ({ cartItems }) => {
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const orderData = {
      userId: userId,
      products: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })),
      totalAmount: totalCost.toFixed(2),
      status: "PENDING",
    };

    try {
      const response = await axios.post('http://localhost:8081/api/orders/save', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Order successfully saved:', response.data);
        alert('Siparişiniz onaylandı');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Hazırlanma aşamasında bir siparişiniz var.');
      } else {
        console.error('Error during checkout:', error);
        alert('Sipariş sırasında bir hata oluştu.');
      }
    }
  };

  return (
    <Container className="cart-container">
      <h3>Sepetiniz</h3>
      {cartItems.length === 0 ? (
        <p>Sepetinizde ürün bulunmuyor.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Adet</th>
                <th>Ücret</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Toplam Ücret: ${totalCost.toFixed(2)}</h4>
          <Button variant="primary" onClick={handleCheckout}>
            Satın Al
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
