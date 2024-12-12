const express = require('express');
const { User } = require('../models/user'); // Import the User model

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET a single user by Spotify User ID
router.get('/:spotifyUserId', async (req, res) => {
  const { spotifyUserId } = req.params;

  try {
    const user = await User.findOne({ where: { spotifyUserId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const { spotifyUserId, username, email, accessToken, refreshToken } = req.body;

  try {
    const newUser = await User.create({ spotifyUserId, username, email, accessToken, refreshToken });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT to update an existing user
router.put('/:spotifyUserId', async (req, res) => {
  const { spotifyUserId } = req.params;
  const { username, email, accessToken, refreshToken } = req.body;

  try {
    const user = await User.findOne({ where: { spotifyUserId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.accessToken = accessToken || user.accessToken;
    user.refreshToken = refreshToken || user.refreshToken;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE a user
router.delete('/:spotifyUserId', async (req, res) => {
  const { spotifyUserId } = req.params;

  try {
    const user = await User.findOne({ where: { spotifyUserId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90
