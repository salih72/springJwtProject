import React, { useEffect, useState, useRef } from 'react';
import OrderTable from './OrderTable';

const Broadcast = () => {
    const [orders, setOrders] = useState([]);
    const socketRef = useRef(null); // WebSocket bağlantısını tutmak için useRef kullanılıyor

    // fetchOrders fonksiyonunu useEffect dışında tanımlıyoruz
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
            console.log("Fetched orders: ", data);
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders(); // İlk başta fetchOrders çalıştırılır

        // WebSocket bağlantısını kur
        socketRef.current = new WebSocket('ws://localhost:8074');

        socketRef.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socketRef.current.onmessage = (event) => {
            console.log('Received message: ', event.data);

            try {
                const newOrder = JSON.parse(event.data);
                setOrders((prevOrders) => {
                    const existingOrderIndex = prevOrders.findIndex(order => order.id === newOrder.id);
                    if (existingOrderIndex !== -1) {
                        // Sipariş zaten var, güncelle
                        const updatedOrders = [...prevOrders];
                        updatedOrders[existingOrderIndex] = newOrder;
                        return updatedOrders;
                    } else {
                        // Yeni siparişi en üste ekle
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
                console.error('WebSocket connection closed unexpectedly');
                setTimeout(() => {
                    console.log('Retrying WebSocket connection...');
                    socketRef.current = new WebSocket('ws://localhost:8074');
                }, 5000);
            }
        };

        return () => {
            socketRef.current.close(); // Bileşen unmount olduğunda WebSocket'i kapat
        };
    }, []);

    const handleStatusToggle = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8081/api/orders/updateStatus/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
    
            // Durum güncellendikten sonra orders state'ini tekrar fetch etmek mantıklı olabilir
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    
    return (
        <div>
            <h2>Broadcast Orders</h2>
            <OrderTable orders={orders} onStatusToggle={handleStatusToggle} />
        </div>
    );
};

export default Broadcast;
