const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/error.middleware'); 

const app = express();

// Middleware
app.use(express.json({ limit: '25mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Static uploads directory
const path = require('path');
const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Face Recognition System API' });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling
app.use(errorHandler);

module.exports = app;
