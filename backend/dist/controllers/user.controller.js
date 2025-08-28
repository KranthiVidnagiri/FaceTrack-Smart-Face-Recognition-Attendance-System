"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.getCurrentUser = exports.getFaculty = void 0;

const User_1 = __importDefault(require("../models/User"));

// @desc    Get faculty only
// @route   GET /api/users/faculty
// @access  Private/HOD
const getFaculty = async (req, res) => {
    try {
        const faculty = await User_1.default.find({ role: "faculty" }).select("-password");
        res.json(faculty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getFaculty = getFaculty;

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getCurrentUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getCurrentUser = getCurrentUser;

// @desc    Get all users
// @route   GET /api/users
// @access  Private/HOD
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getAllUsers = getAllUsers;

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/HOD
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getUserById = getUserById;

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/HOD
const updateUser = async (req, res) => {
    try {
        const { name, email, role, department } = req.body;
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.department = department || user.department;

        const updatedUser = await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password;
        res.json(userResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateUser = updateUser;

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/HOD
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.remove();
        res.json({ message: "User removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteUser = deleteUser;
