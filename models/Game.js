const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  timelimit: {
    type: Number,
    required: true,
    default: 15,
  },
  numoftips: {
    type: Number,
    required: true,
    default: 5,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  template: {
    type: [[String]],
    required: true,
  },
  results: {
    type: [[Boolean]],
  },
  tickets: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      key: {
        type: String,
        required: true,
      },
      tips: {
        type: [[Boolean]],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Game = mongoose.model('game', GameSchema);
