const { DataTypes } = require('sequelize');
<<<<<<< HEAD
const sequelize = require('../connection');
=======
const sequelize = require('../database/connection');
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90

const RecentlyPlayedSong = sequelize.define('RecentlyPlayedSong', {
  songName: { type: DataTypes.STRING, allowNull: false },
  artistName: { type: DataTypes.STRING, allowNull: false },
  albumName: DataTypes.STRING,
  lastPlayed: { type: DataTypes.DATE, allowNull: false },
}, {
  timestamps: true,
});

module.exports = RecentlyPlayedSong;