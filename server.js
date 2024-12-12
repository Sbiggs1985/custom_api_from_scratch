const express = require('express');
const sequelize = require('./connection'); // Make sure this file exports the sequelize instance
const { sequelize: modelsSequelize } = require('./models'); // Import sequelize from models for syncing

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const callbackRoutes = require('./routes/callback');
<<<<<<< HEAD
const userLogin = require('./routes/userLogin');
=======
const userLoginRoutes = require('./routes/userLogin');
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90
const songRoutes = require('./routes/songRoutes'); // Import the song routes

// Sync Sequelize models with the database
modelsSequelize.sync()
  .then(() => {
    console.log('Sequelize models are synced with the database.');
  })
  .catch((err) => {
    console.error('Error syncing models with the database:', err);
  });

// Middleware to parse JSON
app.use(express.json());

// Routes
<<<<<<< HEAD
app.post('/login', userLogin);
=======
app.use('/login', userLoginRoutes);
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90
app.use('/callback', callbackRoutes);
app.use('/songs', songRoutes); // Add this line to handle routes for songs

// Default route
app.get('/', (req, res) => {
  res.send('No burritos. HAHA!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const logger = require('./logger');  // Import the logger

// Test logging
logger.info('This is an info message');
logger.warn('This is a warning message');
<<<<<<< HEAD
logger.error('This is an error message', { errorDetails: 'Some details about the error' });
=======
logger.error('This is an error message', { errorDetails: 'Some details about the error' });
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90
