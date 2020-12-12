const Game = require('../models/Game');
const Ticket = require('../models/Ticket');

// Recursive function generating unique ticket key
exports.getTicketStamp = async () => {
  // Get random key
  var stamp = '';
  var characters = 'ABCDEFGHIJKLMNPQRSTUVXZ123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    stamp += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // Check if ticket with the stamp exists
  const ticket = await Ticket.findOne({ stamp });
  // If ticket found, repeat process
  if (ticket) {
    return getTicketStamp();
  }
  return stamp;
};

// Recursive function generating unique game key
exports.getGameKey = async () => {
  try {
    // Get random key
    var key = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // Check if game with the key exists
    const game = await Game.findOne({ key });
    // If game found, repeat process
    if (game) {
      return getGameKey();
    }
    return key;
  } catch (err) {
    console.error(err.message);
  }
};
