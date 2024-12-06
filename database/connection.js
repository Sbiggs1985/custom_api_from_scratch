const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.database,
  process.env.user_name, // Username
  process.env.password, // Password
  {
    host: process.env.DB_HOST, // ????
    dialect: 'postgres',       // Dialect (e.g., postgres, mysql, sqlite)
    logging: false,            // Disable logging (optional)
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection failed:', err));

module.exports = sequelize;