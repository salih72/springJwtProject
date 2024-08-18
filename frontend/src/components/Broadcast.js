import React, { useEffect, useState } from 'react';

const Broadcast = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish a WebSocket connection to the SimpleSocketServer
    const socket = new WebSocket('ws://localhost:8074'); // Replace with the correct WebSocket address

    // Connection opened
    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    // Listen for messages
    socket.onmessage = (event) => {
      console.log('Message received: ', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    //toDo event.data.id id verir 

    // Handle errors
    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    // Connection closed
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('WebSocket connection closed cleanly');
      } else {
        console.error('WebSocket connection closed unexpectedly');
      }
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((message, index) => ( //message.id dediğimde o benim id im oluyor
          <li key={index}>
            <strong>Message {index + 1}:</strong> {message}
          </li>
        ))}
      </ul>
    </div>
  );
};
//data table components bak
export default Broadcast;
