axios = require('axios');
const { Song, RecentlyPlayedSong } = require('../models');
require('dotenv').config();

const populateRecentlyPlayed = async (accessToken, userId) => {
  try {
    console.log('Fetchinig recently played songs for user:', userId);

    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { limit: 10 },
    });

    const recentlyPlayed = response.data.items;

    for (const item of recentlyPlayed) {
      const track = item.track;

      const [song] = await Song.findOrCreate({
        where: {songId: track.id },
        defaults: {
          title: track.name,
          artist: track.artists.map(artist => artist.name).join(', '),
          album: track.album.name,
          releaseYear: track.album.release_date.split('-')[0],
          genre: null,
          songUrl: track.external_urls.spotify,
        }
      });

      await RecentlyPlayedSong.create({
        userId,
        songId: song.id,
        playedAt: item.played_at,
      });
    }

    console.log('Database populated with recently played songs');
  } catch (error) {
    console.error('Error populating recently played songs:', error);
    if (error.response && error.response.data) {
      console.error('Spotify API error:', error.response.data);
    }
    throw error;
  }
};

module.exports = populateRecentlyPlayed;