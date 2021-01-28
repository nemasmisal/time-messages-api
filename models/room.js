const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'Public'
  },
  users: {
    type: []
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;