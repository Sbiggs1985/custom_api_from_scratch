<<<<<<< HEAD
const db = require('../connection');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
require('dotenv').config();
const { User } = require('../models');

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

router.get('/', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('AUTHORIZATION CODE NOT PROVIDED!!!')
  }
  console.log('Authorization code:', code);

  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data; // access token ususally expites in an hour
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires In:', expires_in);

    const userProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const spotifyUserId = userProfile.data.id;
    const username = userProfile.data.display_name || null;
    const email = userProfile.data.email || null;
    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    console.log('Spotify User ID:', spotifyUserId);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Token Expires At:', tokenExpiresAt);

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
      user: {
        id: spotifyUserId,
        username,
        email,
      }
    });
  } catch (error) {
    console.error('ERROR Exchanging code for tokens:', error.message);
    
    if (error.response && error.response.data) {
      console.error('SPOTIFY API ERROR:', error.response.data);
    }
    res.status(500).send('FAILED AUTHENTICATION..');
  }
});

=======
const db = require('../database/connection');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
require('dotenv').config();
const { User } = require('../models');
const populateRecentlyPlayed = require('../utils/recentlyPlayedSongs');

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

router.get('/', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('AUTHORIZATION CODE NOT PROVIDED!!!')
  }
  console.log('Authorization code:', code);

  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data; // access token ususally expites in an hour
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires In:', expires_in);

    const userProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const spotifyUserId = userProfile.data.id;
    const username = userProfile.data.display_name || null;
    const email = userProfile.data.email || null;
    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    console.log('Spotify User ID:', spotifyUserId);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Token Expires At:', tokenExpiresAt);

    /*
    await User.upsert({
      spotify_user_id: spotifyUserId,
      username,
      email,
      access_token,
      refresh_token,
      token_expires_at: tokenExpiresAt,
    });
    
    
    await populateRecentlyPlayed(access_token, spotifyUserId);
    */

    res.json({
      message: 'AUTHENTICATION WAS A SUCCESS!',
      user: {
        id: spotifyUserId,
        username,
        email,
      }
    });
  } catch (error) {
    console.error('ERROR Exchanging code for tokens:', error.message);
    
    if (error.response && error.response.data) {
      console.error('SPOTIFY API ERROR:', error.response.data);
    }
    res.status(500).send('FAILED AUTHENTICATION..');
  }
});

>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90
module.exports = router;