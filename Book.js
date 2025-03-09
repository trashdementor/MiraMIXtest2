const mongoose = require('mongoose');

const VolumeSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  rating: {
    type: String,
    enum: ['💀', '💩', '🍋', '🍅', '🍊', '🍒', '🌽', '🧅'],
    default: '🍅'
  },
  characteristics: [{
    type: String,
    enum: ['🪔', '🔮', '🧠', '⚰️', '☕', '🌹', '🍷', '🦋']
  }],
  description: {
    type: String
  },
  quotes: [{
    type: String
  }]
});

const ChapterSchema = new mongoose.Schema({
  volume: {
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  }
});

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String
  },
  coverImage: {
    type: String
  },
  status: {
    type: String,
    enum: ['🌕', '🌗', '🌑'],
    default: '🌑'
  },
  language: {
    type: String
  },
  timePeriod: {
    type: String
  },
  location: {
    type: String
  },
  plot: {
    type: String
  },
  genre: [{
    type: String
  }],
  year: {
    type: Number
  },
  country: {
    type: String
  },
  authors: [{
    type: String
  }],
  readCount: {
    type: Number,
    default: 0
  },
  readDate: {
    type: Date
  },
  description: {
    type: String
  },
  volumes: [VolumeSchema],
  chapters: [ChapterSchema],
  currentVolume: {
    type: Number,
    default: 1
  },
  currentChapter: {
    type: Number,
    default: 1
  },
  ageRating: {
    type: String,
    enum: ['0+', '6+', '12+', '16+', '18+'],
    default: '12+'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', BookSchema); 