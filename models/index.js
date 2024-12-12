const sequelize = require('../connection');
const User = require('../models/user');
const Song = require('../models/songs');
const RecentlyPlayedSong = require('../models/recentlyPlayedSongs');

// Define relationships
User.hasMany(RecentlyPlayedSong, { foreignKey: 'userId' });
RecentlyPlayedSong.belongsTo(User, { foreignKey: 'userId' });

Song.hasMany(RecentlyPlayedSong, { foreignKey: 'songId' });
RecentlyPlayedSong.belongsTo(Song, { foreignKey: 'songId' });

// Swagger Models (optional, could be part of your swagger.yaml or inline in JS)
const swaggerModels = {
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          userId: { type: 'integer' },
          username: { type: 'string' },
          email: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Song: {
        type: 'object',
        properties: {
          songId: { type: 'integer' },
          title: { type: 'string' },
          artist: { type: 'string' },
          album: { type: 'string' },
          releaseYear: { type: 'integer' },
          genre: { type: 'string' },
          songUrl: { type: 'string' },
        },
      },
      RecentlyPlayedSong: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          userId: { type: 'integer' },
          songId: { type: 'integer' },
          playedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

// Export Swagger models for use in your Swagger configuration
module.exports = { sequelize, User, Song, RecentlyPlayedSong, swaggerModels };