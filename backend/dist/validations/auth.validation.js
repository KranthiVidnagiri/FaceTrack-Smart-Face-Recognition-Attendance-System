const Joi = require('joi');

// Validation schema for user registration
const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'faculty', 'hod').required(),
    department: Joi.when('role', {
        is: 'student',
        then: Joi.string().required(),
        otherwise: Joi.string().optional()
    })
});

// Validation schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
};
