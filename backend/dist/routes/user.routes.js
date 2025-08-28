"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { Router } = require("express");
const { protect, authorize } = require("../middleware/auth.middleware");
const {
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFaculty,
} = require("../controllers/user.controller");

const router = Router();
router.get("/faculty", getFaculty);

// -------------------- Protected Routes -------------------- //
// All routes below require authentication
router.use(protect);

// @desc    Get logged-in user's profile
// @route   GET /api/users/me
// @access  Private
router.get("/me", getCurrentUser);

// -------------------- HOD Routes -------------------- //
// Only 'hod' can access routes below
router.use(authorize("hod"));

// @desc    Get all users
// @route   GET /api/users
// @access  Private/HOD
router.get("/", getAllUsers);

// @desc    Get all faculty
// @route   GET /api/users/faculty
// @access  Private/HOD
router.get("/faculty", getFaculty);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/HOD
router.get("/:id", getUserById);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/HOD
router.put("/:id", updateUser);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/HOD
router.delete("/:id", deleteUser);

module.exports = router;
