const express = require('express');
const { RecentlyPlayedSong, Song, User } = require('../models'); 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recentlyPlayed = await RecentlyPlayedSong.findAll({
      include: [User, Song],
    });
    res.json(recentlyPlayed);
  } catch (error) {
    console.error('Error fetching recently played songs:', error);
    res.status(500).send({ error: 'Failed to fetch recently played songs' });
  }
});

router.get('/user/:spotifyUserId', async (req, res) => {
  const { spotifyUserId } = req.params;
  try {
    const recentlyPlayed = await RecentlyPlayedSong.findAll({
      include: [Song],
      where: { userId: spotifyUserId },
    });
    res.json(recentlyPlayed);
  } catch (error) {
    console.error('Error fetching recently played songs by user:', error);
    res.status(500).send({ error: 'Failed to fetch recently played songs by user' });
  }
});

router.get('/artist/:artistName', async (req, res) => {
  const { artistName } = req.params;
  try {
    const recentlyPlayed = await RecentlyPlayedSong.findAll({
      include: [{
        model: Song,
        where: { artist: artistName },
      }],
    });
    res.json(recentlyPlayed);
  } catch (error) {
    console.error('Error fetching recently played songs by artist:', error);
    res.status(500).send({ error: 'Failed to fetch recently played songs by artist' });
  }
});

module.exports = router;
