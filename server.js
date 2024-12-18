const express = require('express');
const sequelize = require('./connection'); // Make sure this file exports the sequelize instance
const { sequelize: modelsSequelize } = require('./models'); // Import sequelize from models for syncing
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const callbackRoutes = require('./routes/callback');
const userLogin = require('./routes/userLogin');
const songRoutes = require('./routes/songRoutes'); // Import the song routes
const recentlyPlayedRoutes = require('./routes/recentlyPlayedRoutes');

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Swagger version
    info: {
      title: 'spotifyapi', // API title
      version: '1.0.0', // API version
      description: 'A custom built api that integrates & retrieves song data from Spotify', // API description
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // API server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Paths to the API routes that you want to document
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Sync Sequelize models with the database
modelsSequelize.sync()
  .then(() => {
    console.log('Sequelize models are synced with the database.');
  })
  .catch((err) => {
    console.error('Error syncing models with the database:', err);
  });

// Middleware to parse JSON
app.use(express.json());

// Routess
app.use('/', userLogin);
app.use('/callback', callbackRoutes);
app.use('/songs', songRoutes); 
app.use('/recently-played', recentlyPlayedRoutes);

// Swagger UI route for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route
app.get('/', (req, res) => {
  res.send('No burritos. HAHA!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const logger = require('./logger');  // Import the logger

// Test logging
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message', { errorDetails: 'Some details about the error' });