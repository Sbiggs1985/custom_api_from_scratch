const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Song = sequelize.define('Song', {
  songId: { type: DataTypes.STRING, unique: true, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  artist: { type: DataTypes.STRING, allowNull: false },
  album: DataTypes.STRING,
  releaseYear: DataTypes.INTEGER,
  genre: DataTypes.STRING,
  songUrl: DataTypes.TEXT,
}, {
  timestamps: true,
});

module.exports = Song;