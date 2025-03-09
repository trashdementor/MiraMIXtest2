const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie, getTopMovies } = require('../controllers/movieController');
const { auth, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/movies
// @desc    Получение всех фильмов
// @access  Public
router.get('/', getMovies);

// @route   GET /api/movies/top
// @desc    Получение топ-15 фильмов
// @access  Public
router.get('/top', getTopMovies);

// @route   GET /api/movies/:id
// @desc    Получение фильма по ID
// @access  Public
router.get('/:id', getMovieById);

// @route   POST /api/movies
// @desc    Создание нового фильма
// @access  Private/Admin
router.post('/', [auth, admin], createMovie);

// @route   PUT /api/movies/:id
// @desc    Обновление фильма
// @access  Private/Admin
router.put('/:id', [auth, admin], updateMovie);

// @route   DELETE /api/movies/:id
// @desc    Удаление фильма
// @access  Private/Admin
router.delete('/:id', [auth, admin], deleteMovie);

// @route   POST /api/movies/upload
// @desc    Загрузка изображения для фильма
// @access  Private/Admin
router.post('/upload', [auth, admin], upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router; 