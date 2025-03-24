// src/ChatService.js
import Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class ChatService {
    constructor() {
        this.client = null;
        this.connected = false;
    }

    // Connect to the WebSocket endpoint
    connect = () => {
        this.client = new Stomp.Client({
            brokerURL: 'http://localhost:8080/chat', // Your backend WebSocket URL
            connectHeaders: {},
            debug: (str) => {
                console.log(str);
            },
            onConnect: (frame) => {
                this.connected = true;
                console.log('Connected: ' + frame);
            },
            onStompError: (frame) => {
                console.error('Error: ' + frame);
            },
            webSocketFactory: () => {
                return new SockJS('http://localhost:8080/chat'); // WebSocket endpoint of your Spring Boot app
            },
        });

        this.client.activate();
    };

    // Send a message to the backend (Spring Boot)
    sendMessage = (message) => {
        if (this.connected) {
            this.client.publish({
                destination: '/app/chat', // Spring Boot's app endpoint
                body: JSON.stringify(message),
            });
        } else {
            console.log('Not connected to WebSocket');
        }
    };

    // Subscribe to a topic and handle incoming messages
    subscribeToMessages = (callback) => {
        this.client.subscribe('/topic/messages', (message) => {
            callback(JSON.parse(message.body)); // Handle incoming messages
        });
    };

    // Disconnect from WebSocket
    disconnect = () => {
        if (this.client) {
            this.client.deactivate();
        }
        this.connected = false;
        console.log('Disconnected from WebSocket');
    };
}

const chatService = new ChatService();
export default chatService;
