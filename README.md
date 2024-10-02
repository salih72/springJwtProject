### Spring Boot E-Commerce Application with JWT Authentication and Real-Time Updates

This project is a Spring Boot application that provides a RESTful API for an e-commerce platform. It includes user authentication with JWT, product and order management, Kafka integration for messaging, and a WebSocket server for real-time order updates.

Features
-----

JWT Authentication: Secure user authentication and authorization using JSON Web Tokens.

User Management: Register, authenticate, and manage users with role-based access control.

Product Management: CRUD operations for products.

Order Management: Create, retrieve, update, and delete orders with status tracking.

Kafka Integration: Send order data to Kafka topics for asynchronous processing.

WebSocket Server: Real-time order updates via WebSocket for connected clients.

Asynchronous Processing: Utilize asynchronous services for non-blocking operations.

Exception Handling: Robust error handling and response statuses.

Architecture
-----

The application is divided into two main modules:

**1. Auth API Module (com.springJWT.auth_api)**

Controllers: Handle HTTP requests and responses.

Services: Business logic for authentication, user, product, and order management.

Repositories: Data access layer using Spring Data JPA.

Entities: JPA entities representing database tables.

DTOs: Data Transfer Objects for request and response models.

Security: JWT token generation and validation.

**2. Consumer Application Module (com.consumerapp.consumerApplication)**

OrderSynchronizer: Kafka consumer that listens to order topics and forwards data.

WebSocketServer: WebSocket server for real-time communication with clients.

Prerequisites
-----

Java 11 or higher

Maven 3.6+

Spring Boot 2.5+

Apache Kafka

Zookeeper

A running instance of a database supported by Spring Data JPA (e.g., MySQL, PostgreSQL)

Node.js and npm (if you plan to develop a frontend client)

-----
<img width="1025" alt="Screenshot 2024-10-01 at 2 54 59 PM" src="https://github.com/user-attachments/assets/a5076c13-8f66-400d-a8dc-2a401bc2c086">

-----
<img width="1063" alt="Screenshot 2024-10-01 at 2 55 07 PM" src="https://github.com/user-attachments/assets/86c70f67-f9ed-40ab-8a00-e57d966cdd80">

-----
<img width="476" alt="Screenshot 2024-10-01 at 2 57 07 PM" src="https://github.com/user-attachments/assets/28533582-a73c-485f-bf82-7d1427958138">

-----
<img width="481" alt="Screenshot 2024-10-01 at 2 57 19 PM" src="https://github.com/user-attachments/assets/b8bc4051-768f-469a-9b36-7de443330b59">

-----
<img width="1680" alt="Screenshot 2024-10-01 at 2 58 47 PM" src="https://github.com/user-attachments/assets/9b50d109-20b3-4b53-81dc-c29c144b514f">

-----
<img width="1679" alt="Screenshot 2024-10-01 at 2 59 14 PM" src="https://github.com/user-attachments/assets/9d3d1d1a-e1f9-4f12-ad74-df00c382ad27">

-----
<img width="1679" alt="Screenshot 2024-10-01 at 3 29 53 PM" src="https://github.com/user-attachments/assets/ea4d0ec2-82a6-4238-bd79-70d2eb9974b4">

-----
<img width="1293" alt="Screenshot 2024-10-01 at 3 30 13 PM" src="https://github.com/user-attachments/assets/42517b7b-4e68-41e7-b3b5-ad47f6ee2a07">

-----
