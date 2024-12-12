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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user
 *     description: Authenticates a user by validating username and password.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User credentials for login.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Username and password are required
 *       401:
 *         description: Invalid credentials
 */

// Adding a post route so endpoint is intended to handle post requests
// POST /login (New route)
const userLogin = (req, res) => {
  const { username, password } = req.body;

  console.log( username, password);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Simulate login logic
  if (username == 'test' && password == 'pass') {
    return res.status(200).json({ message: 'Login successful' });
  }

  res.status(401).json({ error: 'Invalid credentials' });
};

module.exports = userLogin;
