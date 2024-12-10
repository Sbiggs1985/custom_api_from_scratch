const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const RecentlyPlayedSong = sequelize.define('RecentlyPlayedSong', {
  songName: { type: DataTypes.STRING, allowNull: false },
  artistName: { type: DataTypes.STRING, allowNull: false },
  albumName: DataTypes.STRING,
  lastPlayed: { type: DataTypes.DATE, allowNull: false },
}, {
  timestamps: true,
});

module.exports = RecentlyPlayedSong;