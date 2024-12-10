const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

console.log('Database Config:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
});

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Username
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