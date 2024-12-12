const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

console.log('Database Config:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
});

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
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

<<<<<<< HEAD:connection.js
module.exports = sequelize;
=======
module.exports = sequelize;
>>>>>>> b7988ca7dd66e739ba7573e1e64c889ca6c16b90:database/connection.js
