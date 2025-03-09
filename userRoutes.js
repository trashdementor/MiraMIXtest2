const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Регистрация нового пользователя
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Аутентификация пользователя и получение токена
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users/me
// @desc    Получение данных текущего пользователя
// @access  Private
router.get('/me', auth, getCurrentUser);

module.exports = router; 