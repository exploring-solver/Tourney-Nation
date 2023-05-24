const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  venue: {
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
  }
});

module.exports = mongoose.model('events', EventSchema);
