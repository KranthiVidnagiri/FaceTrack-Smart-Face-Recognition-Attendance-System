# Face Recognition System - Backend

This is the backend service for the Face Recognition System (FRS) built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication with JWT
- Role-based access control (Student, Faculty, HOD, Admin)
- Face recognition attendance system
- RESTful API endpoints
- Input validation
- Error handling
- Geospatial queries for location-based attendance

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/frs
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users` - Get all users (Admin/HOD only)
- `GET /api/users/:id` - Get user by ID (Admin/HOD only)
- `PUT /api/users/:id` - Update user (Admin/HOD only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Attendance
- `POST /api/attendance/mark` - Mark attendance using face recognition
- `GET /api/attendance/me` - Get my attendance
- `GET /api/attendance/user/:userId` - Get attendance by user (Admin/HOD/Faculty)
- `GET /api/attendance/date/:date` - Get attendance by date (Admin/HOD/Faculty)
- `GET /api/attendance/stats` - Get attendance statistics (Admin/HOD/Faculty)

## Environment Variables

- `PORT` - Port to run the server on (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - JWT expiration time (e.g., 30d, 24h)
- `NODE_ENV` - Node environment (development/production)

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## License

This project is licensed under the MIT License.
