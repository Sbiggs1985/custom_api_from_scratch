const querystring = require('querystring');
const express = require('express');
require('dotenv').config();

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

console.log('SPOTIFY_CLIENT_ID:', CLIENT_ID);
console.log('SPOTIFY_REDIRECT_URI:', REDIRECT_URI);

router.get('/', (req, res) => {
  if (!CLIENT_ID || !REDIRECT_URI) {
    return res.status(500).send({ error: 'Missing Spotify client ID or redirect URI' });
  }

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'user-read-recently-played'
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

module.exports = router;