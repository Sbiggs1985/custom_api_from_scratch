const sequelize = require('../connection');
const User = require('../models/user');
const Song = require('../models/songs');
const RecentlyPlayedSong = require('../models/recentlyPlayedSongs');

// Define relationships
User.hasMany(RecentlyPlayedSong, { foreignKey: 'userId' });
RecentlyPlayedSong.belongsTo(User, { foreignKey: 'userId' });

Song.hasMany(RecentlyPlayedSong, { foreignKey: 'songId' });
RecentlyPlayedSong.belongsTo(Song, { foreignKey: 'songId' });

module.exports = { sequelize, User, Song, RecentlyPlayedSong };