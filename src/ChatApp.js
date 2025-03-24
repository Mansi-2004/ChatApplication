import React, { useState, useEffect } from 'react';
import { Stomp } from 'stomps';
import SockJS from 'sockjs-client';

function ChatApp() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  // Set up WebSocket connection and subscribe to messages
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/chat'); // Connect to your WebSocket endpoint
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/public', (messageOutput) => {
        const receivedMessage = JSON.parse(messageOutput.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });

      // Set up the WebSocket client state
      setStompClient(stompClient);
      setSocket(socket);
    });

    // Clean up when the component is unmounted
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  // Handle sending a message
  const sendMessage = () => {
    if (username && message) {
      const chatMessage = {
        username: username,
        content: message,
      };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setMessage(''); // Clear the message input after sending
    } else {
      alert('Please enter both username and message.');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat Application</h2>
      {/* Username input */}
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      {/* Message input */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      {/* Send button */}
      <button onClick={sendMessage}>Send</button>

      <div className="messages">
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.username}:</strong> {msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatApp;
