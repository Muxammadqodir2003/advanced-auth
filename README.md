# Advanced Authentication System (Express.js)

A production-style authentication system built with **Node.js and Express.js**,
inspired by modern applications like **Telegram**, focusing on security, session control,
and user account protection.

This project demonstrates advanced authentication flows commonly used in real-world systems.

---

## 🚀 Key Features

### 🔐 Authentication
- JWT-based authentication
  - Short-lived **Access Tokens**
  - Long-lived **Refresh Tokens**
- Secure password hashing
- Token rotation and validation

### 📱 Device & Session Management
- Login from multiple devices
- Track active user sessions
- Revoke sessions per device
- Remote logout (invalidate tokens)

### 🔑 Account Security
- Forgot password flow
- Password reset with secure tokens
- Two-Factor Authentication (2FA)
  - Enable / disable 2FA
  - Additional verification step on login

### 🛡 Authorization
- Protected routes with authentication middleware
- Role-based access control

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- JavaScript

**Authentication & Security**
- JSON Web Tokens (JWT)
- Access & Refresh token flow
- Password hashing (bcrypt)
- 2FA logic

**Database**
- MongoDB (Mongoose)

**Tools**
- Git
- REST API
- dotenv

---

## 📂 Project Structure

src/
├── errors/ # Error classes
├── controllers/ # Request handlers
├── routes/ # API routes
├── middlewares/ # Auth & security middleware
├── models/ # Database schemas
├── services/ # Business logic
├── dtos/ # Dto
└── app.js


## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=4000
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
MONGO_URI=your_mongodb_uri
