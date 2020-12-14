const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const random = require('../../utils/random');

const Ticket = require('../../models/Ticket');

// @route    GET api/tickets
// @desc     Get all tickets
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route    GET api/tickets
// @desc     Get tickets by game id
// @access   Private
router.get('/game/:game_id', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ game: req.params.game_id }).sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   POST api/tickets/game_id
// @desc    Submit ticket
// @access  Public
router.post(
  '/:game_id',
  [
    check('tips', 'Tips are required before submitting the ticket.').not().isEmpty(),
    check('tips[*]', 'Tips has to be an array of arrays.').isArray(),
    check('tips[*].*', 'Every field has to be a boolean value.').isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tips } = req.body;

    try {
      // Get unique stamp
      const stamp = await random.getTicketStamp();

      // Build ticket object
      const newTicket = new Ticket({
        game: req.params.game_id,
        stamp,
        tips,
      });

      const ticket = await newTicket.save();
      return res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
