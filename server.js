const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const callbackRoutes = require('./routes/callback');
const userLoginRoutes = require('./routes/userLogin');
const { sequelize } = require('./models'); //The ONLY thing I added to sync the code to models.

app.use('/login', userLoginRoutes);
app.use('/callback', callbackRoutes);

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});