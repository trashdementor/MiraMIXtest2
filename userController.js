const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Регистрация нового пользователя
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка существования пользователя
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
    }

    // Создание нового пользователя
    user = new User({
      username,
      email,
      password
    });

    // Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Создание JWT токена
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Аутентификация пользователя и получение токена
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка существования пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Создание JWT токена
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Получение данных текущего пользователя
// @route   GET /api/users/me
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}; 