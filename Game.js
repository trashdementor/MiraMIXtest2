const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
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
  system: {
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
  genre: [{
    type: String
  }],
  developers: [{
    type: String
  }],
  downloadCount: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  platforms: [{
    type: String
  }],
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

module.exports = mongoose.model('Game', GameSchema); 