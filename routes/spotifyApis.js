const axios = require('axios');
const { Song, RecentlyPlayedSong } = require('../models');

// Fetch and save "Recently Played Songs"
const populateRecentlyPlayed = async (accessToken, userId) => {
  try {
    console.log('Fetching recently played songs for user:', userId);

    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { limit: 10 },
    });

    const recentlyPlayed = response.data.items;

    for (const item of recentlyPlayed) {
      const track = item.track;

      // Insert into "songs" table
      const [song] = await Song.findOrCreate({
        where: { songId: track.id },
        defaults: {
          title: track.name,
          artist: track.artists.map((a) => a.name).join(', '),
          album: track.album.name,
          releaseYear: track.album.release_date.split('-')[0],
          songUrl: track.external_urls.spotify,
        },
      });

      // Insert into "recently_played_songs" table
      await RecentlyPlayedSong.create({
        userId,
        songId: song.id,
        playedAt: item.played_at,
      });
    }

    console.log('Recently played songs successfully saved to the database.');
  } catch (error) {
    console.error('Error fetching recently played songs:', error.message);
    throw error;
  }
};

module.exports = populateRecentlyPlayed;
