"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late', 'excused'],
        default: 'present',
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
        address: String,
    },
    imageUrl: String,
    markedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notes: String,
}, {
    timestamps: true,
});
// Create 2dsphere index for geospatial queries
attendanceSchema.index({ location: '2dsphere' });
// Index for faster querying by user and date
attendanceSchema.index({ user: 1, createdAt: -1 });
const Attendance = mongoose_1.default.model('Attendance', attendanceSchema);
exports.default = Attendance;
