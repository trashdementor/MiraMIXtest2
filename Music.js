const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
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
  album: {
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
  language: {
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
  artist: {
    type: String
  },
  listenCount: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Music', MusicSchema); 