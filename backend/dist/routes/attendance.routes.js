"use strict";
const { Router } = require("express");
const { protect, authorize } = require("../middleware/auth.middleware");
const {
  markAttendance,
  getMyAttendance,
  getAttendanceByUser,
  getAttendanceByDate,
  getAttendanceStats,
} = require("../controllers/attendance.controller");

const router = Router();

// Protected routes (require authentication)
router.use(protect);

// Mark attendance (Face Recognition)
router.post('/mark', authorize('admin','hod','faculty'), markAttendance);

// Get my attendance
router.get('/me', getMyAttendance);

// Admin/HOD/Faculty routes
router.use(authorize('admin', 'hod', 'faculty'));

// Get attendance by user
router.get('/user/:userId', getAttendanceByUser);

// Get attendance by date
router.get('/date/:date', getAttendanceByDate);

// Get attendance statistics
router.get('/stats', getAttendanceStats);

module.exports = router;
