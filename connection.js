const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

console.log('Database Config:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.database,
  DB_PASSWORD: process.env.root,
});

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.database,
  process.env.postgre, // Username
  process.env.password, // Password
  {
    host: process.env.DB_HOST, // ????
    port: process.env.DB_PORT,
    dialect: 'postgres',       // Dialect (e.g., postgres, mysql, sqlite)
    logging: false,            // Disable logging (optional)
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection failed:', err));

module.exports = sequelize;