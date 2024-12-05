// This table stores the song data fetched from spotify, like song id, title, artist, album, .etc.)
const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const User = require('./user.js');
const Song = require('./songs.js');

const UserSongData = sequelize.define('UserSongData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  song_name: {
    type: DataTypes.INTEGER,
    references: {
      model: Song,
      key: 'id',
    },
    allowNull: false,
  },
  track_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  last_played: {
    type: dataTypes.INTEGER,
    defaultvalue: 0,
  }
});

UserSongData.belongsTo(User, { foreignKey: 'user_id' });
UserSongData.belongsTo(Song, { foreignKey: 'song_id' });

module.exports = UserSongData;