const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
  season: {
    type: Number,
    required: true
  },
  episode: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  watched: {
    type: Boolean,
    default: false
  }
});

const SeasonSchema = new mongoose.Schema({
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

const AnimationSeriesSchema = new mongoose.Schema({
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
  dubbing: {
    type: String
  },
  episodeDuration: {
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
  companies: [{
    type: String
  }],
  viewCount: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  seasons: [SeasonSchema],
  episodes: [EpisodeSchema],
  currentSeason: {
    type: Number,
    default: 1
  },
  currentEpisode: {
    type: Number,
    default: 1
  },
  ageRating: {
    type: String,
    enum: ['0+', '6+', '12+', '16+', '18+'],
    default: '0+'
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

module.exports = mongoose.model('AnimationSeries', AnimationSeriesSchema); 