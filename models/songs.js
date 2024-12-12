const { DataTypes } = require('sequelize');
<<<<<<< HEAD
const sequelize = require('../connection');
=======
const sequelize = require('../database/connection');
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90

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