const express = require('express');
const { User, Song, RecentlyPlayedSong } = require('../models');
const router = express.Router();

router.get('/recently-played', async (req, res) => {
  try {
    const songs = await RecentlyPlayedSong.findAll({
      include: {
        model: Song,
        attributes: ['title', 'artist', 'album'],
      },
    });
    res.json(songs);
  } catch (error) {
    console.error('Error fetching recently played songs:', error);
    res.status(500).send({ error: 'Failed to fetch recently played songs' });
  }
});

// Get songs by a specific user
router.get('/user/:spotifyUserId/recently-played', async (req, res) => {
  const { spotifyUserId } = req.params;
  try {
    const songs = await RecentlyPlayedSong.findAll({
      where: { userId: spotifyUserId },
      include: {
        model: Song,
        attributes: ['title', 'artist', 'album'],
      },
    });
    res.json(songs);
  } catch (error) {
    console.error('Error fetching user-specific songs:', error);
    res.status(500).send({ error: 'Failed to fetch user songs' });
  }
});

// Search for songs by artist
router.get('/songs/artist/:artist', async (req, res) => {
  const { artist } = req.params;
  try {
    const songs = await Song.findAll({
      where: {
        artist: { [Op.iLike]: `%${artist}%` }, // Case-insensitive search
      },
    });
    res.json(songs);
  } catch (error) {
    console.error('Error searching for songs:', error);
    res.status(500).send({ error: 'Failed to search for songs' });
  }
});

module.exports = router;
