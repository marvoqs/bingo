const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const keys = require('../../utils/keys');

const Game = require('../../models/Game');

// @route    GET api/games
// @desc     Get all games
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find().sort({ date: -1 });
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   GET api/games/id/:game_id
// @desc    Get game by ID
// @access  Private
router.get('/id/:game_id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }
    res.json(game);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found.' });
    } else {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
});

// @route   GET api/games/:key
// @desc    Get game by key
// @access  Public
router.get('/key/:key', async (req, res) => {
  try {
    const game = await Game.findOne({ key: req.params.key });
    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }
    res.json(game);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found.' });
    } else {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
});

// @route   POST api/games
// @desc    Create game
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('timelimit', 'Time limit has to be a number.').isInt(),
      check('numoftips', 'Number of possible tips has to be a number.').isInt(),
      check('template[*]', 'Template has to be an array of arrays.').isArray(),
      check('template[*].*', 'Every field has to be a string.').isString(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { timelimit, numoftips, template } = req.body;

    try {
      // Get unique key
      const key = await keys.getGameKey();
      // Build game object
      const newGame = new Game({
        user: req.user.id,
        key,
        timelimit,
        numoftips,
        template,
      });

      const game = await newGame.save();
      return res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
