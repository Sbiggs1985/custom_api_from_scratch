const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  song_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  album: {
    type: DataTypes.STRING,
  },
  release_year: {
    type: DataTypes.INTEGER,
  },
  genre: {
    type: DataTypes.STRING,
  },
  play_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  song_url: {
    type: DataTypes.STRING,
  },
});

module.exports = Song;