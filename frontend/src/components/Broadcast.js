import React, { useEffect, useState, useRef } from 'react';
import OrderTable from './OrderTable';
import { useNavigate } from 'react-router-dom';

const Broadcast = () => {
    const [orders, setOrders] = useState([]);
    const socketRef = useRef(null);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8081/api/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    
        socketRef.current = new WebSocket('ws://localhost:8001');
    
        socketRef.current.onopen = () => {
            console.log('WebSocket connection opened');
        };
    
        socketRef.current.onmessage = (event) => {
            console.log('Received message: ', event.data);
    
            try {
                const newOrder = JSON.parse(event.data);
                console.log('----> ' + event.data);

                setOrders((prevOrders) => {
                    const existingOrderIndex = prevOrders.findIndex(order => order.id === newOrder.id);
                    if (existingOrderIndex !== -1) {
                        const updatedOrders = [...prevOrders];
                        updatedOrders[existingOrderIndex] = newOrder;
                        return updatedOrders;
                    } else {
                        return [newOrder, ...prevOrders];
                    }
                });
            } catch (e) {
                console.warn('Invalid JSON message received:', event.data);
            }
        };
    
        socketRef.current.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };
    
        socketRef.current.onclose = (event) => {
            if (event.wasClean) {
                console.log('WebSocket connection closed cleanly');
            } else {
                console.log('WebSocket connection closed unexpectedly');
                setTimeout(() => {
                    console.log('Retrying WebSocket connection...');
                    socketRef.current = new WebSocket('ws://localhost:8001');
                }, 5000);
            }
        };
    
        return () => {
            socketRef.current.close(); 
        };
    }, []);
    

    const handleStatusToggle = async (userId,id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(userId)
            const response = await fetch(`http://localhost:8081/api/orders/updateStatus/${userId}/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
    
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const navigateToAdminProducts = () => {
        navigate('/productsAdmin');
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '60px' }}>
            <OrderTable orders={orders} onStatusToggle={handleStatusToggle} />
            <button 
                onClick={navigateToAdminProducts} 
                style={{ 
                    position: 'fixed', 
                    bottom: '20px', 
                    right: '20px', 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                }}
            >
                Admin Products
            </button>
        </div>
    );
};

export default Broadcast;
