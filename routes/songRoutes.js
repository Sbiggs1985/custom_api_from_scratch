const express = require('express');
const { Song } = require('../models'); // Import the Song model

const router = express.Router();

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Fetch all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: A list of songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Failed to fetch songs
 */

/**
 * GET /songs
 * Fetch all songs
 */
router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.status(200).json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

/**
 * GET /songs/:songId
 * Fetch a specific song by its songId
 */
router.get('/:songId', async (req, res) => {
  try {
    const song = await Song.findOne({ where: { songId: req.params.songId } });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ error: 'Failed to fetch song' });
  }
});

/**
 * POST /songs
 * Add a new song
 */
router.post('/', async (req, res) => {
  const { songId, title, artist, album, releaseYear, genre, songUrl } = req.body;

  try {
    const newSong = await Song.create({
      songId,
      title,
      artist,
      album,
      releaseYear,
      genre,
      songUrl,
    });
    res.status(201).json(newSong);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Failed to create song' });
  }
});

/**
 * PUT /songs/:songId
 * Update an existing song by its songId
 */
router.put('/:songId', async (req, res) => {
  const { title, artist, album, releaseYear, genre, songUrl } = req.body;

  try {
    const song = await Song.findOne({ where: { songId: req.params.songId } });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    await song.update({ title, artist, album, releaseYear, genre, songUrl });
    res.status(200).json(song);
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Failed to update song' });
  }
});

/**
 * DELETE /songs/:songId
 * Delete a song by its songId
 */
router.delete('/:songId', async (req, res) => {
  try {
    const song = await Song.findOne({ where: { songId: req.params.songId } });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    await song.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ error: 'Failed to delete song' });
  }
});

module.exports = router;