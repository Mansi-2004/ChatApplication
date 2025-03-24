import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null); // WebSocket state
  const [message, setMessage] = useState(''); // Message input
  const [messages, setMessages] = useState([]); // Chat history

  // Initialize WebSocket connection
  useEffect(() => {
    const socketConnection = new WebSocket('ws://localhost:8080/chat'); // WebSocket URL from Spring Boot backend
    setSocket(socketConnection);

    // Handle incoming messages
    socketConnection.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Clean up WebSocket connection when the component unmounts
    return () => {
      socketConnection.close();
    };
  }, []);

  // Handle message input changes
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Send message to WebSocket server
  const sendMessage = () => {
    if (message && socket) {
      socket.send(message);
      setMessage(''); // Clear input field after sending message
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <div>
        {/* Display received messages */}
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WebSocketComponent;
