"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // hidden by default
    role: { type: String, enum: ["student", "faculty", "hod"], required: true },
    department: { type: String },
  },
  { timestamps: true }
);

// 🔒 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// 🔑 Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false; // safeguard
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
