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
    required: true,
  },
  tickets: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      key: {
        type: String,
        required: true,
        unique: true,
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
