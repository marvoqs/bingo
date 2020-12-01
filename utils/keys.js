const Game = require('../models/Game');

// Recursive function generating unique ticket key
exports.getTicketKey = async (gameId) => {
  // Get random key
  var key = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // Check if ticket with the key exists

  // If ticket found, repeat process

  return key;
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
      return getUniqueKey();
    }
    return key;
  } catch (err) {
    console.error(err.message);
  }
};
