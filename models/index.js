const sequelize = require('../database');
const User = require('./user.js');
const Song = require('./songs.js');
const UserSongData = require('./UserSongData');

// Define associations
User.hasMany(UserSongData, { foreignKey: 'user_id' });
Song.hasMany(UserSongData, { foreignKey: 'song_id' });

module.exports = { sequelize, User, Song, UserSongData };