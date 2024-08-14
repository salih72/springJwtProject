import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Cart = ({ cartItems }) => {
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const orderData = {
      products: cartItems.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      totalAmount: totalCost,
      customerAddress: "123 Main St" // Bu adresi kullanıcıdan dinamik olarak alabilirsiniz
    };
  
    axios.post('/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // JWT token'ı burada ekleniyor
      }
    })
    .then(response => {
      console.log("Sipariş başarılı:", response.data);
      alert("Siparişiniz alındı!");
    })
    .catch(error => {
      console.error("Sipariş hatası:", error);
      alert("Sipariş sırasında bir hata oluştu.");
    });
  };
  

  return (
    <Container className="mt-5">
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
