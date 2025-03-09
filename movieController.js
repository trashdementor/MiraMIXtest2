const Movie = require('../models/Movie');

// @desc    Получение всех фильмов
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res) => {
  try {
    const { status, title, rating, characteristics, genre, year, country, director, actor } = req.query;
    
    // Построение фильтра
    const filter = {};
    
    if (status) filter.status = status;
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (rating) filter.rating = rating;
    if (characteristics) filter.characteristics = { $in: Array.isArray(characteristics) ? characteristics : [characteristics] };
    if (genre) filter.genre = { $in: Array.isArray(genre) ? genre : [genre] };
    if (year) filter.year = year;
    if (country) filter.country = { $regex: country, $options: 'i' };
    if (director) filter.directors = { $in: Array.isArray(director) ? director.map(d => new RegExp(d, 'i')) : [new RegExp(director, 'i')] };
    if (actor) filter.actors = { $in: Array.isArray(actor) ? actor.map(a => new RegExp(a, 'i')) : [new RegExp(actor, 'i')] };

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Получение фильма по ID
// @route   GET /api/movies/:id
// @access  Public
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    
    // Увеличение счетчика просмотров
    movie.viewCount += 1;
    await movie.save();
    
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Создание нового фильма
// @route   POST /api/movies
// @access  Private/Admin
exports.createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const movie = await newMovie.save();
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Обновление фильма
// @route   PUT /api/movies/:id
// @access  Private/Admin
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    
    // Обновление полей
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, updatedAt: Date.now() } },
      { new: true }
    );
    
    res.json(updatedMovie);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Удаление фильма
// @route   DELETE /api/movies/:id
// @access  Private/Admin
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    
    await movie.remove();
    res.json({ message: 'Фильм удален' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Фильм не найден' });
    }
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Получение топ-15 фильмов
// @route   GET /api/movies/top
// @access  Public
exports.getTopMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ rating: -1 })
      .limit(15);
    
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}; 