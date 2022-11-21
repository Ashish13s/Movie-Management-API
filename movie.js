const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    require: true
  },
  
});

// movieSchema.index({ "$**" : 'text' });
module.exports = mongoose.model('movie', movieSchema);