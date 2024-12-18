const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Import the connection

// Define the User model
const User = sequelize.define('User', {
  spotifyUserId: { type: DataTypes.STRING, unique: true, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  accessToken: { type: DataTypes.TEXT, allowNull: false },
  refreshToken: { type: DataTypes.TEXT, allowNull: false },
  tokenExpiresAt: { type: DataTypes.DATE, allowNull: false }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  tableName: 'User'
});

module.exports = User;