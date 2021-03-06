const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Require dotenv
require('dotenv').config();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: true }));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/games', require('./routes/api/games'));
app.use('/api/tickets', require('./routes/api/tickets'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
