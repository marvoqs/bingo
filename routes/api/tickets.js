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

// @route    DELETE api/tickets
// @desc     Delete tickets by game id
// @access   Private
router.delete('/game/:game_id', auth, async (req, res) => {
  try {
    await Ticket.deleteMany({ game: req.params.game_id });
    res.json({ msg: 'Tickets deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   POST api/tickets/game_id
// @desc    Get new ticket
// @access  Public
router.post('/:game_id', async (req, res) => {
  try {
    // Get unique stamp
    const stamp = await random.getTicketStamp();

    // Build ticket object
    const newTicket = new Ticket({
      game: req.params.game_id,
      stamp,
    });
    const ticket = await newTicket.save();
    return res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   PUT api/tickets/game_id
// @desc    Submit ticket
// @access  Public
router.put(
  '/:ticket_id',
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

    try {
      const ticket = await Ticket.findById(req.params.ticket_id);
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket not found.' });
      }

      ticket.tips = req.body.tips;

      await ticket.save();

      return res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
