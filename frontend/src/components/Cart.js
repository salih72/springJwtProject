import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Cart = ({ cartItems }) => {
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    // Assuming you have a way to get the userId and customer details, possibly from your authentication token
    const token = localStorage.getItem('token'); // Adjust based on how you're storing the token
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Assuming userId is stored in the token
  
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
        // Handle successful order submission
        console.log('Order successfully saved:', response.data);
        // Optionally, redirect or clear the cart after successful checkout
      } else {
        // Handle error cases
        console.error('Failed to save order:', response.data);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
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
