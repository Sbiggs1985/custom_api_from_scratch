const db = require('../connection');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
require('dotenv').config();
const { User, Song, RecentlyPlayedSong } = require('../models');

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
    const username = userProfile.data.display_name;
    const email = userProfile.data.email;
    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    console.log({ spotifyUserId, username, email });

    await User.upsert({
      spotifyUserId,
      username,
      email,
      accessToken: access_token,
      refreshToken: refresh_token,
      tokenExpiresAt: tokenExpiresAt,
    });

    const recentlyPlayedResponse = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { limit: 50 }, 
    });

    const recentlyPlayed = recentlyPlayedResponse.data.items;

    for (const item of recentlyPlayed) {
      const track = item.track;

      const [song] = await Song.findOrCreate({
        where: { songId: track.id },
        defaults: {
          title: track.name,
          artist: track.artists.map(artist => artist.name).join(', '),
          album: track.album.name,
          releaseYear: track.album.release_date.split('-')[0],
          genre: null,
          songUrl: track.external_urls.spotify,
        },
      });

      // Insert into the `recently_played_songs` table
      await RecentlyPlayedSong.create({
        songName: track.name,
        artistName: track.artists.map(artist => artist.name).join(', '),
        albumName: track.album.name,
        lastPlayed: item.played_at,
      });
    }

    console.log('Recently played songs have been saved to the database.');


    console.log({
      spotifyUserId,
      username,
      email,
      accessToken: access_token,
      refreshToken: refresh_token,
      tokenExpiresAt: tokenExpiresAt,
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

module.exports = router;