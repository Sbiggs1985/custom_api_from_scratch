<<<<<<< HEAD
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
=======
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

console.log('Database Config:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.database,
  DB_USER: process.env.postgre,
  DB_PASSWORD: process.env.root,
});

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.datebase,
  process.env.DB_USER,
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT, // Port
    dialect: 'postgres',       // Dialect (postgres for PostgreSQL)
    logging: false,            // Disable logging
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection failed:', err));

module.exports = sequelize;
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90
