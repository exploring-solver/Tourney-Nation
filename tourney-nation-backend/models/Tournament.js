const mongoose = require('mongoose');
const { Schema } = mongoose;

const TournamentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }]
});

module.exports = mongoose.model('Tournament', TournamentSchema);
