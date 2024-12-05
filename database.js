const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // Disable logging for clean console output
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;

// My thoughts
// Sequelize: Use to create & manage the DB connection, run queries, and define models.
//dotenv: Loads env vars from a .env file into process.env, keeping sensitive info (like credentials) secure & separate from the codebase.

//------

// Creating the sequelize
// The sequelize constructor initializes a connection to the postgre db using values from the .env file.
