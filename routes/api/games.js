const express = require('express');
const router = express.Router();

// @route    GET api/games
// @desc     Test route
// @access   Private
router.get('/', (req, res) => res.send('Game route'));

module.exports = router;
