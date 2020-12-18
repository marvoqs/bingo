const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const random = require('../../utils/random');

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

// @route   GET api/games/pinned
// @desc    Get pinned game
// @access  Public
router.get('/pinned', async (req, res) => {
  try {
    const game = await Game.findOne({ pinned: true, active: true }).select('_id timelimit numoftips template active');
    if (!game) {
      return res.status(404).json({ msg: 'There is no pinned game.' });
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   PUT api/games/pin/:game_id
// @desc    Pin game
// @access  Private
router.put('/pin/:game_id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }

    // Check if user is the owner of the game
    if (game.user != req.user.id) {
      return res.status(401).json({ msg: 'You have not permission to pin this game.' });
    }

    // Unpin all games
    await Game.updateMany({}, { $set: { pinned: false } });

    game.pinned = true;

    await game.save();

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

// @route   PUT api/games/unpin/:game_id
// @desc    Unpin game
// @access  Private
router.put('/unpin/:game_id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }

    // Check if user is the owner of the game
    if (game.user != req.user.id) {
      return res.status(401).json({ msg: 'You have not permission to unpin this game.' });
    }

    game.pinned = false;

    await game.save();

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

// @route   PUT api/games/start/:game_id
// @desc    Start game
// @access  Private
router.put('/start/:game_id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }

    // Check if user is the owner of the game
    if (game.user != req.user.id) {
      return res.status(401).json({ msg: 'You have not permission to start this game.' });
    }

    game.active = true;

    await game.save();

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

// @route   PUT api/games/stop/:game_id
// @desc    Stop game
// @access  Private
router.put('/stop/:game_id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }

    // Check if user is the owner of the game
    if (game.user != req.user.id) {
      return res.status(401).json({ msg: 'You have not permission to stop this game.' });
    }

    game.active = false;

    await game.save();

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
    const game = await Game.findOne({ key: req.params.key }).select('_id timelimit numoftips template active');

    // Check if game exists
    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }

    // Check if game is active
    if (!game.active) {
      return res.status(401).json({ msg: 'This game is already closed.' });
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
      check('timelimit', 'Time limit is required.').not().isEmpty(),
      check('timelimit', 'Time limit has to be a number.').isInt(),
      check('title', 'Title has to be a string.').isString(),
      check('numoftips', 'Number of possible tips is required.').not().isEmpty(),
      check('numoftips', 'Number of possible tips has to be a number.').isInt(),
      check('template', 'Template is required.').not().isEmpty(),
      check('template[*]', 'Template has to be an array of arrays.').isArray(),
      check('template[*].*', 'Every field has to be a string.').isString(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, timelimit, numoftips, template } = req.body;

    // Build initial results array filled with false values
    const results = [...template.map((item) => [...item.map((item) => false)])];

    try {
      // Get unique key
      const key = await random.getGameKey();
      // Build game object
      const newGame = new Game({
        user: req.user.id,
        key,
        title,
        timelimit,
        numoftips,
        template,
        results,
      });

      const game = await newGame.save();
      return res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route   PUT api/games/results/game_id
// @desc    Update results
// @access  Private
router.put(
  '/results/:game_id',
  [
    auth,
    [
      check('results', 'Results are required.').not().isEmpty(),
      check('results[*]', 'Results has to be an array of arrays.').isArray(),
      check('results[*].*', 'Every field has to be a boolean value.').isBoolean(),
    ],
  ],
  async (req, res) => {
    try {
      const game = await Game.findById(req.params.game_id);
      if (!game) {
        return res.status(404).json({ msg: 'Game not found.' });
      }

      // Check on user
      if (game.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'You have not permission to update results of this game.' });
      }

      game.results = req.body;

      await game.save();

      res.json(game);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Game not found.' });
      } else {
        console.error(err.message);
        res.status(500).send('Server error.');
      }
    }
  }
);

// @route   DELETE api/games/:game_id
// @desc    Delete game by ID
// @access  Private
router.delete('/:game_id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);

    if (!game) {
      return res.status(404).json({ msg: 'Game not found.' });
    }

    // Check on user
    if (game.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'You have not permission to delete this game.' });
    }

    await game.remove();
    res.json({ msg: 'Game deleted.' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Game not found.' });
    } else {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
});

module.exports = router;
