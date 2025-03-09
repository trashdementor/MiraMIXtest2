const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String
  }
});

const StepSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

const RecipeSchema = new mongoose.Schema({
  type: {
    type: String
  },
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
  rating: {
    type: String,
    enum: ['💀', '💩', '🍋', '🍅', '🍊', '🍒', '🌽', '🧅'],
    default: '🍅'
  },
  ingredients: [IngredientSchema],
  cookingTime: {
    type: String
  },
  cookCount: {
    type: Number,
    default: 0
  },
  steps: [StepSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema); 