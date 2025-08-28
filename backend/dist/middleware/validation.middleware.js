"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { registerSchema, loginSchema } = require('../validations/auth.validation');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) {
        const errors = error.details.map((err) => ({
            field: err.path.join('.'),
            message: err.message.replace(/"/g, ''),
        }));

        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors,
        });
    }

    next();
};

module.exports = {
    validate,
    registerSchema,
    loginSchema
};
