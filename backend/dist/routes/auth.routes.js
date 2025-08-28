"use strict";
const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { validate, registerSchema, loginSchema } = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
