const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const { User } = require('../models');

const router = express.Router();

// Load Spotify credentials from environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

console.log('SPOTIFY_CLIENT_ID:', CLIENT_ID);
console.log('SPOTIFY_REDIRECT_URI:', REDIRECT_URI);

// --- User Login Route ---
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Username:', username, 'Password:', password);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Simulated login logic
  if (username === 'test' && password === 'pass') {
    return res.status(200).json({ message: 'Login successful' });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// --- Spotify Authorization Route ---
router.get('/login', (req, res) => {
  const scope = 'user-read-email user-read-private user-read-recently-played';

  if (!CLIENT_ID || !REDIRECT_URI) {
    return res.status(500).send({ error: 'Missing Spotify client ID or redirect URI' });
  }

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: scope,
    show_dialog: true,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// --- Spotify OAuth Callback Route ---
router.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('AUTHORIZATION CODE NOT PROVIDED!!!');
  }
  console.log('Authorization code:', code);

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires In:', expires_in);

    // Fetch Spotify user profile
    const userProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const spotifyUserId = userProfile.data.id;
    const username = userProfile.data.display_name || null;
    const email = userProfile.data.email || null;
    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    console.log('Spotify User ID:', spotifyUserId);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Token Expires At:', tokenExpiresAt);

    // Save or update user in the database
    await User.upsert({
      spotify_user_id: spotifyUserId,
      username,
      email,
      access_token,
      refresh_token,
      token_expires_at: tokenExpiresAt,
    });

    res.json({
      message: 'AUTHENTICATION WAS A SUCCESS!',
      user: { id: spotifyUserId, username, email },
    });
  } catch (error) {
    console.error('ERROR Exchanging code for tokens:', error.message);

    if (error.response && error.response.data) {
      console.error('SPOTIFY API ERROR:', error.response.data);
    }
    res.status(500).send('FAILED AUTHENTICATION..');
  }
});

module.exports = router;
