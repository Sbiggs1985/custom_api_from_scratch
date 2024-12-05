const express = require('express');
const axios = require('axios');
const { Track } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Spotify API credentials
const SPOTIFY_CLIENT_ID = 'your_spotify_client_id';
const SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret';

// Spotify token
let spotifyAccessToken = '';

// Function to get Spotify access token
async function fetchSpotifyAccessToken() {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            grant_type: 'client_credentials',
        },
    });
    spotifyAccessToken = response.data.access_token;
    console.log('Spotify Access Token Retrieved:', spotifyAccessToken);
}

// Fetch token on startup
fetchSpotifyAccessToken();

// Route to fetch tracks by search query
app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query parameter is required' });

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: { Authorization: `Bearer ${spotifyAccessToken}` },
            params: {
                q: query,
                type: 'track',
                limit: 10,
            },
        });

        // Save fetched tracks to the database
        const tracks = response.data.tracks.items.map((item) => ({
            trackId: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            album: item.album.name,
            duration: item.duration_ms,
        }));

        await Track.insertMany(tracks, { ordered: false }).catch(() => {}); // Avoid duplicate key errors
        res.json(tracks);
    } catch (error) {
        console.error('Error fetching tracks:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch tracks from Spotify' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
