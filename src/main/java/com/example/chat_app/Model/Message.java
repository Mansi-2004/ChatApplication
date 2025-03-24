package com.example.chat_app.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Message {

    private String username;
    private String content;

    // Default constructor (required for deserialization)
    public Message() {}

    // Constructor for easy instantiation
    public Message(String username, String content) {
        this.username = username;
        this.content = content;
    }

    // Getter and Setter for username
    @JsonProperty("username") // Ensures that the 'username' field is correctly serialized/deserialized
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter for content
    @JsonProperty("content") // Ensures that the 'content' field is correctly serialized/deserialized
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
