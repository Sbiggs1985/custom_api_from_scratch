const express = require('express');
const sequelize = require('./connection'); // Make sure this file exports the sequelize instance
const { sequelize: modelsSequelize } = require('./models'); // Import sequelize from models for syncing

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const callbackRoutes = require('./routes/callback');
const userLoginRoutes = require('./routes/userLogin');

// Sync Sequelize models with the database
modelsSequelize.sync()
  .then(() => {
    console.log('Sequelize models are synced with the database.');
  })
  .catch((err) => {
    console.error('Error syncing models with the database:', err);
  });

app.use('/login', userLoginRoutes);
app.use('/callback', callbackRoutes);

app.get('/', (req, res) => {
  res.send('Burritos are meant to be big and full!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// changes