"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceStats = exports.getAttendanceByDate = exports.getAttendanceByUser = exports.getMyAttendance = exports.markAttendance = void 0;
const Attendance_1 = __importDefault(require("../models/Attendance"));
const User_1 = __importDefault(require("../models/User"));
// @desc    Mark attendance using face recognition
// @route   POST /api/attendance/mark
// @access  Private

const markAttendance = async (req, res) => {
    try {
        const { userId, status, location, imageUrl } = req.body;

        // Only faculty or HOD can mark attendance
        if (!req.user || !['faculty','hod','admin'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Only faculty/HOD can mark attendance' });
        }

        // Verify the user exists
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent duplicate marking for the same user on the same day
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date();
        endOfDay.setHours(23,59,59,999);

        const existing = await Attendance_1.default.findOne({
            user: userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });
        if (existing) {
            return res.status(409).json({ message: 'Attendance already marked for today' });
        }

        // Save image if provided as base64 data URL
        let savedImageUrl = null;
        if (imageUrl && imageUrl.startsWith('data:image')) {
            const matches = imageUrl.match(/^data:(image\/\w+);base64,(.+)$/);
            if (matches) {
                const ext = matches[1].split('/')[1];
                const data = matches[2];
                const buffer = Buffer.from(data, 'base64');
                const filename = `${Date.now()}_${userId}.${ext}`;
                const uploadPath = path.join(__dirname, '..', 'uploads', filename);
                fs.writeFileSync(uploadPath, buffer);
                savedImageUrl = `/uploads/${filename}`;
            }
        } else if (imageUrl) {
            savedImageUrl = imageUrl;
        }

        // Create new attendance record
        const attendance = new Attendance_1.default({
            user: userId,
            status: status || 'present',
            location,
            imageUrl: savedImageUrl,
            markedBy: req.user.id
        });
        await attendance.save();

        res.status(201).json({
            message: 'Attendance marked successfully',
            attendance
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.markAttendance = markAttendance;

// @desc    Get my attendance
// @route   GET /api/attendance/me
// @access  Private
const getMyAttendance = async (req, res) => {
    try {
        const attendance = await Attendance_1.default.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate('markedBy', 'name email');
        res.json(attendance);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getMyAttendance = getMyAttendance;
// @desc    Get attendance by user
// @route   GET /api/attendance/user/:userId
// @access  Private/Admin/HOD/Faculty
const getAttendanceByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { startDate, endDate } = req.query;
        let query = { user: userId };
        // Add date range filter if provided
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        const attendance = await Attendance_1.default.find(query)
            .sort({ createdAt: -1 })
            .populate('user', 'name email role department')
            .populate('markedBy', 'name email');
        res.json(attendance);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getAttendanceByUser = getAttendanceByUser;
// @desc    Get attendance by date
// @route   GET /api/attendance/date/:date
// @access  Private/Admin/HOD/Faculty
const getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const dateObj = new Date(date);
        const nextDay = new Date(dateObj);
        nextDay.setDate(dateObj.getDate() + 1);
        const attendance = await Attendance_1.default.find({
            createdAt: {
                $gte: dateObj,
                $lt: nextDay
            }
        })
            .populate('user', 'name email role department')
            .populate('markedBy', 'name email')
            .sort({ createdAt: -1 });
        res.json(attendance);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getAttendanceByDate = getAttendanceByDate;
// @desc    Get attendance statistics
// @route   GET /api/attendance/stats
// @access  Private/Admin/HOD/Faculty
const getAttendanceStats = async (req, res) => {
    try {
        const { startDate, endDate, department } = req.query;
        let match = {};
        // Add date range filter if provided
        if (startDate && endDate) {
            match.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        // Add department filter if provided
        if (department) {
            const users = await User_1.default.find({ department });
            match.user = { $in: users.map(u => u._id) };
        }
        const stats = await Attendance_1.default.aggregate([
            { $match: match },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        // Calculate total
        const total = stats.reduce((sum, stat) => sum + stat.count, 0);
        // Format response
        const formattedStats = stats.reduce((acc, stat) => ({
            ...acc,
            [stat._id]: stat.count,
            [`${stat._id}Percentage`]: total > 0 ? Math.round((stat.count / total) * 100) : 0
        }), { total });
        res.json(formattedStats);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getAttendanceStats = getAttendanceStats;
