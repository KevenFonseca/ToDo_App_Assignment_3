const authRoute = require('express').Router()
const authController = require('../controllers/auth.controller')

// Signup
authRoute.post('/signup', authController.signup)

// Login
authRoute.post('/login', authController.login)

module.exports = authRoute