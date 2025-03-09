const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Загрузка переменных окружения
dotenv.config();

// Инициализация приложения Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Статические файлы
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Подключение к базе данных MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB подключена'))
  .catch(err => console.log('Ошибка подключения к MongoDB:', err));

// Маршруты
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));

// Базовый маршрут
app.get('/', (req, res) => {
  res.json({ message: 'API сервера МираMIX работает' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так на сервере!' });
});

// Определение порта
const PORT = process.env.PORT || 5000;

// Запуск сервера
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`)); 