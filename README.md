# BusyBrains E-Commerce Reference Application

This is a Full Stack Web Application built using **React** (Frontend) and **Spring Boot** (Backend). 
It features a complete authentication flow (local JWT & OAuth2 SSO), Role-Based Access Control (Admin/User), a dynamic Product catalog, and self-service User profiles.

## Technologies Used
* **Frontend**: React 18, React Router DOM v6, Axios, Vanilla CSS
* **Backend**: Java 17+, Spring Boot 3.4.x, Spring Security (JWT + OAuth2), Spring Data JPA
* **Database**: MySQL

---

## Default Seed Data

Upon startup, the backend automatically seeds two user roles into your database:
* **Admin Account:** username: `admin`, password: `password` 
  *(Has permissions to Add, Edit, and Delete products)*
* **User Account:** username: `user`, password: `password` 
  *(Has Read-Only permissions for the product catalog)*

---

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js and npm
- MySQL running locally on port 3306.

### 1. Database Setup
Ensure your local MySQL service is running. Open your MySQL client and create a new schema:
```sql
CREATE DATABASE ecommerce;
```

### 2. Backend Setup
1. CD into the backend folder:
   ```bash
   cd ecommerce-backend
   ```
2. Open `src/main/resources/application.properties` and replace `YOUR_PASSWORD_HERE` with your actual MySQL database password.
3. Start the application:
   ```bash
   ./mvnw spring-boot:run
   ```
*(The backend will run on `http://localhost:8080`)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd ecommerce-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React server:
   ```bash
   npm start
   ```
*(The frontend will automatically open to `http://localhost:3000`)*

---

## Application APIs & Postman Testing

### Auth Endpoints
* `POST /api/auth/signin` : Authenticate user & get JWT Token.
* `POST /api/auth/signup` : Register a new user.

### Products Endpoints
* `GET /api/products` : Fetch all products (Requires Authenticated Status).
* `POST /api/products` : Create product (ADMIN Only).
* `PUT /api/products/{id}` : Update product (ADMIN Only).
* `DELETE /api/products/{id}` : Delete product (ADMIN Only).

### User Profile Endpoints
* `GET /api/profile` : Get current user details.
* `PUT /api/profile` : Update email/username.
* `PUT /api/profile/change-password` : Update local password hash.

---

## OAuth2 (SSO) Google Setup

To enable "Login with Google":
1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a Project and configure the "OAuth Consent Screen".
3. Inside "Credentials", create an **OAuth Client ID** for a Web Application.
4. Set Authorized Redirect URI: `http://localhost:8080/login/oauth2/code/google`
5. Copy your new Client ID and Client Secret.
6. Open `ecommerce-backend/src/main/resources/application.properties` and paste them into:
   ```properties
   spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
   spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
   ```
   
The next time you boot the application, the Google SSO button on the login screen will properly authorize users and automatically issue them a local JWT session!
