const sequelize = require('../database/connection');
const User = require('./User');
const Song = require('./Song');
const RecentlyPlayedSong = require('./RecentlyPlayedSong');

// Define relationships
User.hasMany(RecentlyPlayedSong, { foreignKey: 'userId' });
RecentlyPlayedSong.belongsTo(User, { foreignKey: 'userId' });

Song.hasMany(RecentlyPlayedSong, { foreignKey: 'songId' });
RecentlyPlayedSong.belongsTo(Song, { foreignKey: 'songId' });

// Export models and Sequelize instance
module.exports = { sequelize, User, Song, RecentlyPlayedSong };