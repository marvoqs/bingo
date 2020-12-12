const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'game',
  },
  stamp: {
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
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
