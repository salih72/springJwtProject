import React, { useEffect, useState } from 'react';
import OrderTable from './OrderTable';

const Broadcast = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders/last20');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
        
      } catch (error) {
        
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();

    const socket = new WebSocket('ws://localhost:8074');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      console.log('Received message: ', event.data);

      try {
        const newOrder = JSON.parse(event.data);
        setOrders((prevOrders) => {
          const updatedOrders = [newOrder, ...prevOrders].slice(0, 20);
          return updatedOrders;
        });
      } catch (e) {
        console.warn('Invalid JSON message received:', event.data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('WebSocket connection closed cleanly');
      } else {
        console.error('WebSocket connection closed unexpectedly');
        setTimeout(() => {
          console.log('Retrying WebSocket connection...');
          fetchOrders();
        }, 5000);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>Broadcast Orders</h2>
      <OrderTable orders={orders} />
    </div>
  );
};

export default Broadcast;
