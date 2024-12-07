const db = require('./db/db_setup');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');


const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('AUTHORIZATION CODE NOT PROVIDED!!!')
  }

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

    const userProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const spotifyUserId = userProfile.data.id;
    const username = userProfile.data.display_name || null;
    const email = userProfile.data.email || null;
    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    // insert or update the users record in te users table with spotify_token, access_token, refresh_token and token expiration
    const query = `
      INSERT INTO users (spotify_user_id, username, email, access_token, refresh_token, token_expires_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (spotify_user_id)
      DO UPDATE SET
      access_token = EXCLUDED.access_token,
      refresh_token = EXCLUDED.refresh_token,
      tokenExpiresAt = EXCLUDED.token_expires_at
      `;

      const values = [
        spotifyUserId,
        username,
        email,
        access_token,
        refresh_token,
        tokenExpiresAt,
      ];

      await db.query(query, values);

    res.json({
      message: 'AUTHENTICATION WAS A SUCCESS!',
      user: {
        id: spotifyUserId,
        username,
        email,
      }
    });
  } catch (error) {
    console.error('ERROR Exchanging code for tokens:', error.response.data);
    res.status(500).send('FAILED AUTHENTICATION..');
  }
});

module.exports = router;