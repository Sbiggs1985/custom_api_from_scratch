const { Sequelize } = require('sequelize'); //sequeize libaray/ A node.js ORM Framework
require('dotenv').config(); // Load environment variables

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Username
  process.env.DB_PASSWORD,  // Password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',    // Database type
    logging: false,         // Disable SQL query logging for cleaner output
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

// Export the Sequelize instance for use in other modules
module.exports = sequelize;

// My thoughts
// Sequelize: Use to create & manage the DB connection, run queries, and define models.
//dotenv: Loads env vars from a .env file into process.env, keeping sensitive info (like credentials) secure & separate from the codebase.

//------

// Creating the sequelize
// The sequelize constructor initializes a connection to the postgre db using values from the .env file.
