const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
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
  direction: {
    type: String
  },
  url: {
    type: String,
    required: true
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Website', WebsiteSchema); 