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
  getdate: {
    type: Date,
    default: Date.now,
  },
  submitdate: {
    type: Date,
  },
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
