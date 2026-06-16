# 🔐 Advanced Authentication System

> A production-grade authentication system built with **Express.js**, **MongoDB**, and **JWT**. Inspired by modern authentication patterns from applications like **Telegram**, featuring advanced security, multi-device session management, and comprehensive user account protection.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage & Scripts](#-usage--scripts)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Session & Device Management](#-session--device-management)
- [Two-Factor Authentication](#-two-factor-authentication)
- [Security Features](#-security-features)
- [Database Schema](#-database-schema)
- [Error Handling](#-error-handling)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Authentication

- **JWT-based Authentication**
  - Short-lived **Access Tokens** (15 minutes)
  - Long-lived **Refresh Tokens** (7 days)
  - Automatic token rotation
  - Token validation and verification

- **User Registration & Login**
  - Email validation
  - Secure password hashing (bcrypt)
  - Login history tracking
  - Email verification (optional)

- **Password Management**
  - Forgot password flow with secure recovery tokens
  - Password reset with email verification
  - Password strength validation
  - Secure password change functionality

### 📱 Multi-Device & Session Management

- **Multiple Login Sessions**
  - Login from multiple devices simultaneously
  - Track active devices/sessions
  - Device information (browser, OS, IP address)
  - Last activity timestamp

- **Session Control**
  - View all active sessions
  - Remote logout (revoke specific session)
  - Automatic session timeout
  - Device-based session management

- **Security Alerts**
  - New login notifications
  - Suspicious activity alerts
  - Device recognition system
  - Login attempt monitoring

### 🔐 Account Security

- **Two-Factor Authentication (2FA)**
  - Enable/disable 2FA per account
  - TOTP-based verification (optional)
  - Backup codes generation
  - Recovery key management

- **Account Protection**
  - Failed login attempt tracking
  - Temporary account lockout
  - IP-based security rules
  - Device fingerprinting

- **User Profile Management**
  - Update profile information
  - Profile picture upload
  - Contact information management
  - Account settings customization

### 🛡️ Authorization & Access Control

- **Role-Based Access Control (RBAC)**
  - Admin roles
  - User roles
  - Permission management
  - Protected routes with middleware

- **Protected Routes**
  - Authentication middleware
  - Authorization checks
  - Role verification
  - Token validation

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js 5.1.0 |
| **Language** | JavaScript (ES6+) |
| **Database** | MongoDB (NoSQL) |
| **ODM** | Mongoose 8.19.1 |
| **Authentication** | JSON Web Tokens (JWT) |
| **Password Hashing** | bcrypt 6.0.0 |
| **Email** | Nodemailer 7.0.9 |
| **Cookies** | cookie-parser 1.4.7 |
| **CORS** | cors 2.8.5 |
| **Env Config** | dotenv 17.2.3 |
| **Dev Tools** | Nodemon 3.1.10 |

### Package Breakdown

**Production Dependencies** (8 packages):
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT generation/validation
- bcrypt - Password hashing
- nodemailer - Email sending
- cookie-parser - Cookie handling
- cors - Cross-origin resource sharing
- dotenv - Environment variables

**Dev Dependencies** (1 package):
- nodemon - Development server with auto-reload

---

## 🏗 Project Structure

```
advanced-auth/
├── server/
│   ├── controllers/                 # Request handlers
│   │   ├── auth.controller.js      # Auth endpoints
│   │   └── user.controller.js      # User management
│   │
│   ├── routes/                     # API routes
│   │   ├── auth.route.js           # Auth routes
│   │   └── user.route.js           # User routes
│   │
│   ├── models/                     # Database schemas
│   │   ├── User.js                 # User model
│   │   ├── Session.js              # Session model
│   │   └── RefreshToken.js         # Refresh token model
│   │
│   ├── services/                   # Business logic
│   │   ├── auth.service.js         # Auth business logic
│   │   ├── user.service.js         # User business logic
│   │   ├── mail.service.js         # Email service
│   │   └── token.service.js        # Token management
│   │
│   ├── middlewares/                # Express middlewares
│   │   ├── auth.middleware.js      # JWT validation
│   │   ├── error.middleware.js     # Error handling
│   │   └── role.middleware.js      # Role checking
│   │
│   ├── dtos/                       # Data transfer objects
│   │   ├── register.dto.js         # Register request
│   │   ├── login.dto.js            # Login request
│   │   └── user.dto.js             # User response
│   │
│   ├── errors/                     # Custom error classes
│   │   ├── ApiError.js             # API error
│   │   ├── ValidationError.js      # Validation error
│   │   └── AuthenticationError.js  # Auth error
│   │
│   ├── utils/                      # Utility functions
│   │   ├── validators.js           # Input validation
│   │   ├── mail-templates.js       # Email templates
│   │   └── constants.js            # App constants
│   │
│   ├── app.js                      # Express app setup
│   ├── package.json                # Dependencies
│   └── .env.example                # Environment template
│
├── client/                         # Frontend (React/Vue/etc.)
│   └── (Optional: Frontend code)
│
└── README.md                       # Documentation
```

### Architecture Overview

```
┌─────────────────────────────────────┐
│      Client Application             │
│   (Web/Mobile/Desktop)              │
└──────────────┬──────────────────────┘
               │ HTTP/REST
               │
┌──────────────▼──────────────────────┐
│   Express.js API Server             │
│  ┌──────────────────────────────┐   │
│  │ Routes (auth, user)          │   │
│  ├──────────────────────────────┤   │
│  │ Controllers (handle requests)│   │
│  ├──────────────────────────────┤   │
│  │ Services (business logic)    │   │
│  ├──────────────────────────────┤   │
│  │ Middlewares (auth, validate) │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┬───────────┐
        │             │           │
┌───────▼──────┐ ┌───▼────┐ ┌──▼──────────┐
│  MongoDB     │ │ Redis  │ │ Nodemailer  │
│  (Database)  │ │(Cache) │ │  (Email)    │
└──────────────┘ └────────┘ └─────────────┘
```

---

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **MongoDB**: Local or Atlas (cloud)
- **Git**: For version control

### Optional
- **Postman/Insomnia**: For API testing
- **VSCode**: Recommended IDE

---

## 💻 Installation & Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/Muxammadqodir2003/advanced-auth.git
cd advanced-auth/server
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit with your configuration
nano .env
```

### Step 4: Start MongoDB

```bash
# If running locally
mongod

# Or use MongoDB Atlas (cloud)
# Add connection string to .env
```

### Step 5: Start Development Server

```bash
# Start with auto-reload (development)
npm run server

# Or start production
npm start
```

Server will run on `http://localhost:4000`

---

## 🔧 Environment Variables

Create a `.env` file in the `server/` directory:

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=4000
NODE_ENV=development

# ============================================
# DATABASE CONFIGURATION
# ============================================
# Local MongoDB
MONGO_URI=mongodb://localhost:27017/advanced-auth

# Or MongoDB Atlas (cloud)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/advanced-auth

# ============================================
# JWT CONFIGURATION
# ============================================
# Access Token Secret (short-lived: 15 min)
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars

# Refresh Token Secret (long-lived: 7 days)
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars

# Password Reset Token Secret
JWT_RESET_PASSWORD_SECRET=your_password_reset_secret_min_32_chars

# Email Verification Token Secret
JWT_EMAIL_VERIFICATION_SECRET=your_email_verification_secret_min_32_chars

# Token Expiration Times
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
JWT_RESET_PASSWORD_EXPIRATION=1h
JWT_EMAIL_VERIFICATION_EXPIRATION=24h

# ============================================
# NODEMAILER CONFIGURATION (Email Service)
# ============================================
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_app_password  # Use App Password, not regular password
MAIL_FROM=noreply@auth-system.com
MAIL_FROM_NAME=Auth System

# ============================================
# CLIENT CONFIGURATION
# ============================================
CLIENT_URL=http://localhost:3000

# ============================================
# SESSION CONFIGURATION
# ============================================
SESSION_TIMEOUT=24h  # Auto-logout after inactivity
MAX_SESSIONS_PER_USER=5  # Max concurrent sessions

# ============================================
# SECURITY SETTINGS
# ============================================
# Failed login protection
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=15m  # Lock account for 15 min after max attempts

# Password requirements
MIN_PASSWORD_LENGTH=8
REQUIRE_UPPERCASE=true
REQUIRE_LOWERCASE=true
REQUIRE_NUMBERS=true
REQUIRE_SPECIAL_CHARS=true

# ============================================
# CORS CONFIGURATION
# ============================================
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# ============================================
# LOGGING
# ============================================
LOG_LEVEL=debug
```

### Important Notes:
- **JWT Secrets**: Use strong, random secrets (min 32 characters)
- **Email Password**: Use Gmail App Password, not regular password
- **CLIENT_URL**: Match your frontend URL
- **MONGO_URI**: Update with your MongoDB connection
- **Never commit .env**: Add to .gitignore

---

## 📦 Usage & Scripts

Available npm scripts:

| Command | Description |
|---------|------------|
| `npm run server` | Start development server with Nodemon (auto-reload) |
| `npm start` | Start production server |

### Development Workflow

```bash
# 1. Navigate to server directory
cd server

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env with your settings

# 4. Start development server
npm run server

# Server running on http://localhost:4000
```

---

## 🔌 API Endpoints

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "id": "user_id",
  "email": "user@example.com",
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "id": "user_id",
  "email": "user@example.com",
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "sessions": [...]
}
```

#### Refresh Token
```
POST /api/auth/refresh
Authorization: Bearer <refresh_token>

Response: 200 OK
{
  "accessToken": "new_jwt_access_token",
  "refreshToken": "new_jwt_refresh_token"
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer <access_token>

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

#### Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response: 200 OK
{
  "message": "Password reset link sent to email"
}
```

#### Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!"
}

Response: 200 OK
{
  "message": "Password reset successful"
}
```

### User Endpoints

#### Get Profile
```
GET /api/user/profile
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Update Profile
```
PATCH /api/user/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1234567890"
}

Response: 200 OK
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

#### Change Password
```
POST /api/user/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

### Session Management Endpoints

#### Get All Sessions
```
GET /api/user/sessions
Authorization: Bearer <access_token>

Response: 200 OK
{
  "sessions": [
    {
      "id": "session_id",
      "deviceName": "Chrome on Windows",
      "ipAddress": "192.168.1.100",
      "lastActivity": "2024-01-15T10:30:00Z",
      "isCurrent": true
    },
    ...
  ]
}
```

#### Logout from Device
```
POST /api/user/sessions/:sessionId/logout
Authorization: Bearer <access_token>

Response: 200 OK
{
  "message": "Logged out from device successfully"
}
```

#### Logout from All Devices
```
POST /api/user/sessions/logout-all
Authorization: Bearer <access_token>

Response: 200 OK
{
  "message": "Logged out from all devices"
}
```

### 2FA Endpoints

#### Enable 2FA
```
POST /api/user/2fa/enable
Authorization: Bearer <access_token>

Response: 200 OK
{
  "qrCode": "qr_code_url",
  "backupCodes": ["code1", "code2", "code3", ...]
}
```

#### Verify 2FA Code
```
POST /api/user/2fa/verify
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "code": "123456"
}

Response: 200 OK
{
  "message": "2FA enabled successfully"
}
```

#### Disable 2FA
```
POST /api/user/2fa/disable
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "password": "current_password"
}

Response: 200 OK
{
  "message": "2FA disabled successfully"
}
```

---

## 🔐 Authentication Flow

### JWT Token Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  USER LOGIN                             │
└──────────────────────┬──────────────────────────────────┘
                       │ POST /auth/login
                       ├─ Validate email/password
                       ├─ Hash password check (bcrypt)
                       └─ Check 2FA (if enabled)
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │ Generate Tokens                      │
    ├──────────────────────────────────────┤
    │ • Access Token (15 min)              │
    │ • Refresh Token (7 days)             │
    │ • Create Session record              │
    └──────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ Store Refresh Token          │
        ├──────────────────────────────┤
        │ • HTTP-only cookie           │
        │ • Or localStorage (client)   │
        └──────────────────────────────┘
                       │
                       ▼
        Return Access Token to Client
        
┌──────────────────────────────────────────────────────────┐
│        AUTHENTICATED API REQUESTS                        │
└──────────────────────────────┬───────────────────────────┘
                               │
        Authorization: Bearer <access_token>
        │
        ├─ JwtAuthMiddleware validates token
        ├─ Check signature & expiration
        ├─ Extract user ID from payload
        └─ Attach user to request
        │
        ▼
    ✓ Request processed
    
┌──────────────────────────────────────────────────────────┐
│      TOKEN REFRESH FLOW (When Access Token Expires)     │
└──────────────────────────────┬───────────────────────────┘
                               │
        POST /auth/refresh
        Header: refresh_token
        │
        ├─ Validate refresh token
        ├─ Check if not blacklisted
        ├─ Generate new access token
        └─ Generate new refresh token
        │
        ▼
    Return new Access Token
    (Refresh Token may rotate too)
```

---

## 📱 Session & Device Management

### How Multi-Device Login Works

```
Device 1 (Login)           Device 2 (Login)           Device 3 (Login)
     │                          │                          │
     └──────────┬───────────────┴──────────────┬───────────┘
                │                              │
     All devices connected to same account
                │
    ┌───────────▼──────────────┐
    │ Sessions Collection      │
    │  (MongoDB)               │
    ├──────────────────────────┤
    │ Session 1: Device 1      │
    │  - Browser info          │
    │  - IP address            │
    │  - Last activity: now    │
    │                          │
    │ Session 2: Device 2      │
    │  - Browser info          │
    │  - IP address            │
    │  - Last activity: now    │
    │                          │
    │ Session 3: Device 3      │
    │  - Browser info          │
    │  - IP address            │
    │  - Last activity: 2h ago │
    └──────────────────────────┘

User can:
✓ View all active sessions
✓ Logout from specific device
✓ Logout from all devices
✓ See device activity history
```

---

## 🔐 Two-Factor Authentication

### 2FA Setup Flow

```
User Request 2FA Enable
    │
    ├─ Generate TOTP secret
    ├─ Create QR code
    ├─ Generate backup codes (8-10 codes)
    │
    ▼
Display QR Code + Backup Codes
(User scans with authenticator app)
    │
    ├─ User enters 6-digit code from app
    │
    ▼
Verify Code
    │
    ├─ Match TOTP code
    ├─ Store secret (encrypted)
    ├─ Mark 2FA enabled
    │
    ▼
2FA Enabled Successfully
(Backup codes saved securely)

Next Login with 2FA:
1. Enter email/password
2. Get 2FA prompt
3. Enter 6-digit code from authenticator
4. Or use backup code
5. Login successful
```

---

## 🛡️ Security Features

| Feature | Implementation |
|---------|----------------|
| **Password Hashing** | bcrypt with salt rounds |
| **JWT Signing** | HS256 algorithm |
| **Token Storage** | HTTP-only cookies |
| **CORS** | Whitelist allowed origins |
| **Rate Limiting** | Request throttling |
| **Input Validation** | Email/password validation |
| **SQL Injection Prevention** | Mongoose (NoSQL) |
| **XSS Prevention** | Input sanitization |
| **CSRF Protection** | SameSite cookies |
| **Session Timeout** | Automatic logout |
| **Login Attempt Limit** | Lock after N attempts |
| **Email Verification** | Verify email before activation |
| **Password Requirements** | Min length, uppercase, numbers, special chars |
| **Secure Tokens** | Cryptographically random |
| **Device Fingerprinting** | Track device info |
| **IP Tracking** | Monitor login locations |

---

## 🗄️ Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String (optional),
  avatar: String (optional),
  role: String (default: 'user'),
  
  // 2FA
  twoFactorEnabled: Boolean,
  twoFactorSecret: String (encrypted),
  backupCodes: [String],
  
  // Account Status
  isVerified: Boolean,
  isActive: Boolean,
  isBanned: Boolean,
  
  // Login Attempts
  loginAttempts: Number,
  lockUntil: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  passwordChangedAt: Date
}
```

### Session Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  
  // Device Info
  deviceName: String,
  deviceType: String,
  browser: String,
  browserVersion: String,
  os: String,
  osVersion: String,
  
  // Network Info
  ipAddress: String,
  userAgent: String,
  
  // Token
  refreshToken: String,
  
  // Activity
  createdAt: Date,
  lastActivity: Date,
  expiresAt: Date
}
```

### Refresh Token Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  sessionId: ObjectId (ref: Session),
  token: String (hashed),
  isRevoked: Boolean,
  createdAt: Date,
  expiresAt: Date
}
```

---

## ⚠️ Error Handling

### Custom Error Classes

```javascript
// ApiError - General API errors
throw new ApiError(400, 'Invalid input');

// ValidationError - Input validation
throw new ValidationError('Email is required');

// AuthenticationError - Auth failures
throw new AuthenticationError('Invalid credentials');

// AuthorizationError - Permission denied
throw new AuthorizationError('Access denied');
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

---

## 🎯 Best Practices

### For Backend Developers

1. **Always validate input** on server-side
2. **Hash passwords** with bcrypt (min 10 rounds)
3. **Use HTTPS** in production
4. **Set HTTP-only cookies** for tokens
5. **Implement rate limiting** on auth endpoints
6. **Monitor failed login attempts** for suspicious activity
7. **Log security events** for audit trail
8. **Rotate tokens** regularly
9. **Use environment variables** for secrets
10. **Keep dependencies updated**

### For Frontend Developers

1. **Store tokens securely** (prefer HTTP-only cookies)
2. **Never expose sensitive data** in console
3. **Handle token expiration** gracefully
4. **Implement auto-logout** on inactivity
5. **Show login location** on suspicious activity
6. **Allow session management** UI
7. **Implement 2FA UI** if enabled
8. **Clear sensitive data** on logout
9. **Use HTTPS** only
10. **Validate tokens** on page load

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Test** your changes thoroughly
4. **Commit** with clear messages (`git commit -m 'feat: Add amazing feature'`)
5. **Push** to branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Code Standards
- Follow ES6+ conventions
- Use meaningful variable names
- Add comments for complex logic
- Test error scenarios
- Keep functions small and focused

---

## 📄 License

This project is licensed under the **ISC License**

---

## 🔗 Related Resources

- **Express.js Docs**: https://expressjs.com/
- **MongoDB Docs**: https://docs.mongodb.com/
- **JWT Docs**: https://jwt.io/
- **bcrypt**: https://github.com/kelektiv/node.bcrypt.js

---

## 📊 Project Statistics

- **Language**: JavaScript
- **Repository Created**: October 13, 2025
- **Last Updated**: December 29, 2025
- **Status**: 🟢 Active Development
- **Forks**: 1
- **Stars**: 0

---

## 📞 Support

- **Issues**: Report bugs on [GitHub Issues](https://github.com/Muxammadqodir2003/advanced-auth/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Muxammadqodir2003/advanced-auth/discussions)

---

## 🎯 Roadmap

- [ ] Email verification system
- [ ] Google/GitHub OAuth integration
- [ ] Biometric authentication
- [ ] WebAuthn (passwordless login)
- [ ] Account recovery options
- [ ] Security audit logs UI
- [ ] IP whitelist feature
- [ ] Suspicious activity dashboard
- [ ] API rate limiting dashboard
- [ ] Mobile app authentication

---

## 🙏 Acknowledgments

Built with ❤️ using modern authentication best practices:
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [JWT](https://jwt.io/) - Token standard
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing
- [Nodemailer](https://nodemailer.com/) - Email service

---

**Made by Muxammadqodir2003** | [GitHub](https://github.com/Muxammadqodir2003)