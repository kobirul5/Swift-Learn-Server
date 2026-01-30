# Swift-Learn Server

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![Express](https://img.shields.io/badge/Express-5.1-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-8.16-green.svg)
![License](https://img.shields.io/badge/License-ISC-blue.svg)

**A robust RESTful API for a Learning Management System (LMS) built with Express.js, TypeScript, and MongoDB**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [API Documentation](#api-documentation) • [Project Structure](#project-structure) • [Deployment](#deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Payment Integration](#payment-integration)
- [File Upload](#file-upload)
- [Error Handling](#error-handling)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Swift-Learn Server** is a comprehensive backend API for a modern Learning Management System. It provides a complete solution for managing online courses, student enrollments, payments, testimonials, FAQs, and real-time communication between students and administrators.

The API is built with scalability, security, and maintainability in mind, following industry best practices and clean architecture principles.

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with access and refresh tokens
- **Role-based access control** (Admin, Student)
- **Secure password hashing** using bcrypt
- **Email verification** with OTP
- **Password reset** functionality
- **Cookie-based session management**

### 📚 Course Management
- **CRUD operations** for courses, modules, and lectures
- **Course categorization** and featured courses
- **Course thumbnails** and media management
- **Module-based course structure**
- **Lecture ordering** within modules

### 👨‍🎓 Student Management
- **Student enrollment** tracking
- **Course progress** monitoring
- **Student profiles** with customizable information
- **Enrollment history** and analytics

### 💳 Payment Processing
- **Stripe integration** for secure payments
- **Multiple payment methods** (Card, CashApp, Apple Pay, Venmo)
- **Webhook handling** for payment confirmations
- **Transaction history** and receipts
- **Automated enrollment** upon successful payment

### 📝 Content Management
- **Testimonials** management
- **FAQ** system
- **Contact form** submissions
- **User-generated content** moderation

### 📁 File Management
- **Cloudinary integration** for media storage
- **Image and video uploads**
- **Automatic file optimization**
- **Secure file deletion**

### 🔔 Real-time Features
- **Socket.io integration** (ready for implementation)
- **Real-time notifications**
- **Live chat support** (infrastructure ready)

### 🛡️ Security Features
- **CORS protection** with whitelisted origins
- **Input validation** using Zod
- **SQL injection prevention**
- **XSS protection**
- **Rate limiting** (ready for implementation)
- **Helmet.js** security headers (ready for implementation)

---

## 🛠️ Tech Stack

### Core Technologies
- **Runtime:** Node.js 18+
- **Language:** TypeScript 5.8
- **Framework:** Express.js 5.1
- **Database:** MongoDB 8.16 with Mongoose ODM

### Key Dependencies
- **Authentication:** jsonwebtoken, bcrypt
- **Validation:** Zod 4.2
- **Payment:** Stripe 20.1
- **File Upload:** Multer 2.0, Cloudinary 2.8
- **Email:** Nodemailer 7.0
- **HTTP Status:** http-status 2.1
- **CORS:** cors 2.8
- **Cookie Parser:** cookie-parser 1.4

### Development Tools
- **TypeScript Compiler:** tsc
- **Dev Server:** ts-node-dev
- **Linting:** ESLint 9.29 with TypeScript ESLint
- **Code Quality:** Prettier (recommended)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Stripe CLI** (for webhook testing) - [Download](https://stripe.com/docs/stripe-cli)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/swift-learn-server.git
cd swift-learn-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

### 5. Verify Installation

Open your browser or API client and navigate to:

```
http://localhost:5000
```

You should see: `Welcome Swift Learn Management`

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/swift-learn
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swift-learn?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key
REFRESH_TOKEN_EXPIRES_IN=30d

# Bcrypt
BCRYPT_SALT_ROUNDS=12

# Email Configuration (SMTP)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_PRODUCTION=https://your-production-domain.com

# Optional: Vercel Configuration (if deploying to Vercel)
VERCEL_OIDC_TOKEN=your-vercel-token
```

### 📝 Environment Variables Explanation

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode (development/production) | Yes |
| `PORT` | Server port number | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT access tokens | Yes |
| `JWT_EXPIRES_IN` | Access token expiration time | Yes |
| `REFRESH_TOKEN_SECRET` | Secret key for refresh tokens | Yes |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh token expiration time | Yes |
| `BCRYPT_SALT_ROUNDS` | Number of salt rounds for bcrypt | Yes |
| `SMTP_SERVER` | SMTP server for sending emails | Yes |
| `SMTP_PORT` | SMTP server port | Yes |
| `SMTP_USER` | SMTP username/email | Yes |
| `SMTP_PASS` | SMTP password/app password | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | No |

---

## 📁 Project Structure

```
swift-learn-server/
├── src/
│   ├── app/
│   │   ├── middlewares/           # Custom middleware functions
│   │   │   ├── auth.middleware.ts # JWT authentication middleware
│   │   │   ├── checkBlock.ts      # User blocking middleware
│   │   │   └── globalErrorHandler.ts # Global error handler
│   │   ├── module/                # Feature modules
│   │   │   ├── auth/              # Authentication module
│   │   │   ├── chat/              # Chat module (Socket.io ready)
│   │   │   ├── contact/           # Contact form module
│   │   │   ├── course/            # Course management
│   │   │   ├── courseModule/      # Course modules
│   │   │   ├── courseProgress/    # Student progress tracking
│   │   │   ├── enrollment/        # Student enrollment
│   │   │   ├── faq/               # FAQ management
│   │   │   ├── lecture/           # Lecture management
│   │   │   ├── payment/           # Payment processing
│   │   │   ├── room/              # Chat rooms (Socket.io ready)
│   │   │   ├── student/           # Student management
│   │   │   ├── testimonial/       # Testimonials
│   │   │   └── users/             # User management
│   │   ├── socket/                # Socket.io handlers (ready)
│   │   ├── types/                 # TypeScript type definitions
│   │   └── utils/                 # Utility functions
│   ├── envs/                      # Environment configuration
│   │   └── index.ts               # Centralized env config
│   ├── error/                     # Custom error classes
│   ├── helpers/                   # Helper functions
│   │   ├── fileUploader.ts        # File upload helper
│   │   ├── fileDelete.ts          # File deletion helper
│   │   └── ...                    # Other helpers
│   ├── router/                    # Route aggregator
│   │   └── index.ts               # Main router
│   ├── shared/                    # Shared utilities
│   ├── app.ts                     # Express app configuration
│   └── server.ts                  # Server entry point
├── dist/                          # Compiled JavaScript (generated)
├── node_modules/                  # Dependencies (generated)
├── .env                           # Environment variables (not in git)
├── .env.local                     # Local environment (not in git)
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── package.json                   # Project metadata & dependencies
├── tsconfig.json                  # TypeScript configuration
├── vercel.json                    # Vercel deployment config
├── Swift-Learn-Server.postman_collection.json # Postman API collection
└── README.md                      # This file
```

### 📂 Module Structure

Each feature module follows a consistent structure:

```
module-name/
├── module-name.interface.ts    # TypeScript interfaces
├── module-name.model.ts        # Mongoose schema & model
├── module-name.service.ts      # Business logic
├── module-name.controller.ts   # Request handlers
├── module-name.route.ts        # Route definitions
└── module-name.validation.ts   # Zod validation schemas (if applicable)
```

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api/v1
Production: https://your-domain.com/api/v1
```

### 📖 Postman Collection

A complete Postman collection is available in the repository:

```
Swift-Learn-Server.postman_collection.json
```

**To import:**
1. Open Postman
2. Click **Import**
3. Select the `Swift-Learn-Server.postman_collection.json` file
4. All endpoints will be available with example requests

### 🔗 API Endpoints Overview

#### Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/verify-otp` | Verify email OTP | No |
| POST | `/resend-otp` | Resend OTP | No |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/reset-password` | Reset password with token | No |
| POST | `/refresh-token` | Get new access token | No |
| POST | `/logout` | User logout | Yes |

#### Users (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/get-me` | Get current user profile | Yes | Any |
| PATCH | `/update-me` | Update current user | Yes | Any |
| GET | `/` | Get all users | Yes | Admin |
| GET | `/:id` | Get user by ID | Yes | Admin |

#### Courses (`/api/v1/courses`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all courses | No | - |
| GET | `/:id` | Get course by ID | No | - |
| POST | `/` | Create new course | Yes | Admin |
| PATCH | `/:id` | Update course | Yes | Admin |
| DELETE | `/:id` | Delete course | Yes | Admin |

#### Modules (`/api/v1/modules`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all modules | No | - |
| GET | `/:id` | Get module by ID | No | - |
| POST | `/` | Create new module | Yes | Admin |
| PATCH | `/:id` | Update module | Yes | Admin |
| DELETE | `/:id` | Delete module | Yes | Admin |

#### Lectures (`/api/v1/lecture`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all lectures | No | - |
| GET | `/:id` | Get lecture by ID | No | - |
| POST | `/` | Create new lecture | Yes | Admin |
| PATCH | `/:id` | Update lecture | Yes | Admin |
| DELETE | `/:id` | Delete lecture | Yes | Admin |

#### Enrollment (`/api/v1/enrollment`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/my-enrollments` | Get user's enrollments | Yes | Student |
| POST | `/enroll` | Enroll in course | Yes | Student |
| GET | `/` | Get all enrollments | Yes | Admin |
| GET | `/:id` | Get enrollment by ID | Yes | Admin |

#### Payments (`/api/v1/payment`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/create-checkout-session` | Create Stripe session | Yes | Student |
| GET | `/my-payments` | Get user's payments | Yes | Student |
| GET | `/` | Get all payments | Yes | Admin |
| GET | `/:id` | Get payment by ID | Yes | Admin |

#### Testimonials (`/api/v1/testimonials`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all testimonials | No | - |
| GET | `/:id` | Get testimonial by ID | No | - |
| POST | `/` | Create testimonial | Yes | Admin |
| PATCH | `/:id` | Update testimonial | Yes | Admin |
| DELETE | `/:id` | Delete testimonial | Yes | Admin |

#### FAQs (`/api/v1/faqs`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all FAQs | No | - |
| GET | `/:id` | Get FAQ by ID | No | - |
| POST | `/` | Create FAQ | Yes | Admin |
| PATCH | `/:id` | Update FAQ | Yes | Admin |
| DELETE | `/:id` | Delete FAQ | Yes | Admin |

#### Contact (`/api/v1/contacts`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/` | Submit contact form | No | - |
| GET | `/` | Get all contacts | Yes | Admin |
| GET | `/:id` | Get contact by ID | Yes | Admin |
| DELETE | `/:id` | Delete contact | Yes | Admin |

#### Students (`/api/v1/students`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/` | Get all students | Yes | Admin |
| GET | `/:id` | Get student by ID | Yes | Admin |

#### Webhooks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/webhook/stripe` | Stripe webhook handler | No (Stripe signature) |

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Registration**
   - User registers with email and password
   - OTP sent to email for verification
   - User verifies email with OTP
   - Account activated

2. **Login**
   - User provides email and password
   - Server validates credentials
   - JWT access token and refresh token issued
   - Refresh token stored in HTTP-only cookie

3. **Token Refresh**
   - When access token expires, client sends refresh token
   - Server validates refresh token
   - New access token issued

4. **Logout**
   - Refresh token removed from cookie
   - Client discards access token

### Authorization

The API uses role-based access control (RBAC):

- **Public Routes:** No authentication required
- **Authenticated Routes:** Valid JWT required
- **Admin Routes:** Valid JWT + Admin role required
- **Student Routes:** Valid JWT + Student role required

### Using Authentication

Include the JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

Or the token will be automatically sent via HTTP-only cookies.

---

## 💳 Payment Integration

### Stripe Integration

The API uses Stripe for payment processing with support for multiple payment methods.

#### Supported Payment Methods
- Credit/Debit Cards
- Apple Pay
- Google Pay
- CashApp
- Venmo

#### Payment Flow

1. **Create Checkout Session**
   ```
   POST /api/v1/payment/create-checkout-session
   Body: { courseId: "...", paymentMethod: "card" }
   ```

2. **Redirect to Stripe**
   - Client receives Stripe Checkout URL
   - User completes payment on Stripe

3. **Webhook Confirmation**
   - Stripe sends webhook to `/webhook/stripe`
   - Server verifies payment
   - Enrollment created automatically
   - Payment record updated

4. **Success/Failure Redirect**
   - User redirected to success or failure page
   - Frontend displays appropriate message

#### Testing Stripe Webhooks Locally

1. Install Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   scoop install stripe
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to local server:
   ```bash
   npm run stripe:listen
   ```

4. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`

---

## 📁 File Upload

### Cloudinary Integration

The API uses Cloudinary for file storage and management.

#### Supported File Types
- Images: JPG, PNG, GIF, WebP
- Videos: MP4, WebM, MOV
- Documents: PDF (if configured)

#### Upload Flow

1. **Client sends multipart/form-data**
   - File included in request body
   - Multer middleware processes upload

2. **Server uploads to Cloudinary**
   - File streamed to Cloudinary
   - Optimized and stored

3. **URL returned to client**
   - Cloudinary URL saved in database
   - URL returned in response

#### Example Upload Request

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'Course Title');

fetch('/api/v1/courses', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

---

## ⚠️ Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message here",
  "errorMessages": [
    {
      "path": "field.name",
      "message": "Specific error message"
    }
  ],
  "stack": "Error stack trace (development only)"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (authentication required) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 500 | Internal Server Error |

### Common Error Scenarios

1. **Validation Error (400)**
   ```json
   {
     "success": false,
     "message": "Validation Error",
     "errorMessages": [
       {
         "path": "email",
         "message": "Invalid email format"
       }
     ]
   }
   ```

2. **Authentication Error (401)**
   ```json
   {
     "success": false,
     "message": "Unauthorized: Invalid or expired token"
   }
   ```

3. **Authorization Error (403)**
   ```json
   {
     "success": false,
     "message": "Forbidden: Admin access required"
   }
   ```

4. **Not Found (404)**
   ```json
   {
     "success": false,
     "message": "Course not found"
   }
   ```

---

## 📜 Scripts

### Development

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint:fix
```

### Testing

```bash
# Run tests (when implemented)
npm test
```

### Stripe

```bash
# Listen to Stripe webhooks locally
npm run stripe:listen
```

---

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel deployment.

#### Prerequisites
- Vercel account
- Vercel CLI installed: `npm i -g vercel`

#### Steps

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all variables from `.env`

#### Vercel Configuration

The `vercel.json` file is already configured:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

### Railway Deployment

Alternative deployment option.

1. **Create Railway account**
2. **Connect GitHub repository**
3. **Add environment variables**
4. **Deploy automatically on push**

### Traditional VPS Deployment

For deployment on VPS (DigitalOcean, AWS EC2, etc.):

1. **Install Node.js and MongoDB**
2. **Clone repository**
3. **Install dependencies**
   ```bash
   npm install --production
   ```
4. **Build project**
   ```bash
   npm run build
   ```
5. **Set up PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name swift-learn-api
   pm2 save
   pm2 startup
   ```
6. **Set up Nginx as reverse proxy**
7. **Configure SSL with Let's Encrypt**

---

## 🔒 Security Best Practices

### Implemented Security Measures

✅ **JWT Authentication** - Secure token-based authentication  
✅ **Password Hashing** - Bcrypt with configurable salt rounds  
✅ **CORS Protection** - Whitelisted origins only  
✅ **Input Validation** - Zod schema validation  
✅ **HTTP-only Cookies** - Secure refresh token storage  
✅ **Environment Variables** - Sensitive data not in code  
✅ **Error Handling** - No sensitive data in error messages  
✅ **Mongoose Injection Prevention** - Built-in protection  

### Recommended Additional Measures

⚠️ **Rate Limiting** - Implement with `express-rate-limit`  
⚠️ **Helmet.js** - Add security headers  
⚠️ **HTTPS Only** - Enforce in production  
⚠️ **Request Size Limits** - Prevent DoS attacks  
⚠️ **SQL Injection** - Already prevented by Mongoose  
⚠️ **XSS Protection** - Sanitize user inputs  

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run linting**
   ```bash
   npm run lint:fix
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB team for the powerful database
- Stripe for payment processing
- Cloudinary for media management
- All contributors and supporters

---

## 📞 Support

For support, email support@swiftlearn.com or join our Slack channel.

---

## 🗺️ Roadmap

### Current Version (v1.0.0)
- ✅ User authentication and authorization
- ✅ Course management
- ✅ Payment processing with Stripe
- ✅ File uploads with Cloudinary
- ✅ Email notifications

### Upcoming Features (v1.1.0)
- 🔄 Real-time chat with Socket.io
- 🔄 Course reviews and ratings
- 🔄 Certificate generation
- 🔄 Advanced analytics dashboard
- 🔄 Video streaming optimization

### Future Enhancements (v2.0.0)
- 📅 Live class scheduling
- 📅 Assignment submissions
- 📅 Quiz and assessment system
- 📅 Discussion forums
- 📅 Mobile app API support

---

<div align="center">

**Made with ❤️ by the Swift-Learn Team**

[⬆ Back to Top](#swift-learn-server)

</div>
