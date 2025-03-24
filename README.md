CHAT APPLICATION
A simple real-time chat application built using Spring Boot for the backend and React.js for the frontend.

Features
1.Real-time messaging using WebSockets
2.User-friendly chat interface

Technologies Used
=>Frontend: React.js, HTML, CSS, JavaScript
=>Backend: Spring Boot, WebSockets

Prerequisites
=>Before running the application, make sure you have the following installed:
=>Java 11 or higher
=>Node.js and npm

Project Structure
Backend (Spring Boot): Handles the chat logic and WebSocket connections.
Frontend (React.js): Provides the user interface to send and receive messages.

Setup & Installation
1. Backend Setup (Spring Boot)
Clone the repository:

bash
Copy
git clone <repository-url>
Navigate to the backend directory:

bash
Copy
cd backend
Build the project:

bash
Copy
mvn clean install
Run the backend:

bash
Copy
mvn spring-boot:run
The backend server will start on http://localhost:8080.

2. Frontend Setup (React.js)
Navigate to the frontend directory:

bash
Copy
cd frontend
Install the required dependencies:

bash
Copy
npm install
Run the React development server:

bash
Copy
npm start
The frontend will be available at http://localhost:3001.

Running the Application
Open your browser and go to http://localhost:3000.
The chat application should be live, and you can start sending messages.

