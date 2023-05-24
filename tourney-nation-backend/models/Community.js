const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommunitySchema = new Schema({
  communityName: {
    type: String,
    required: true
  },
  communityType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('communities', CommunitySchema);
