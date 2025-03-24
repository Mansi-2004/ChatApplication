package com.example.chat_app.Controller;

import com.example.chat_app.Model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    // Constructor-based injection of SimpMessagingTemplate to send messages to clients
    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Handle sending chat messages
    @MessageMapping("/chat.sendMessage") // Maps to /app/chat.sendMessage in the frontend
    @SendTo("/topic/public") // Sends to all subscribers of /topic/public
    public Message sendMessage(Message message) throws Exception {
        // Broadcast the message to all connected clients
        return message;
    }

    // Handle adding users (users joining the chat)
    @MessageMapping("/chat.addUser") // Maps to /app/chat.addUser in the frontend
    @SendTo("/topic/public") // Sends to all subscribers of /topic/public
    public String addUser(String username) {
        // Notify all clients that a user has joined
        return username + " has joined!";
    }

    // Optional: You could use SimpMessagingTemplate directly to send custom messages if needed.
    public void sendCustomMessage(String message) {
        messagingTemplate.convertAndSend("/topic/public", message);
    }
}
