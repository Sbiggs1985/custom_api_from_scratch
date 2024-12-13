Custom Spotify API

Project Overview

Title Custom Spotify API

Description: A custom-built API that integrates with Spotify, allowing users to log in, fetch their data, and interact with it.

Technologies Used:
    Backend: Node.js, Express.js
    Database: Sequelize (MySQL, PostGRE)
    Authentication: Spotify OAuth
    Documentation: Swagger
    Logging: Custom Logging via app.log

Architecture Diagram

The following diagram outlines the API's architecture:
Client (Frontend) <--OAuth--> Spotify
           |
           v
   ---------------------
   |  Custom API       |
   ---------------------
   | Server.js         |
   ---------------------
       | Routes Layer |
       ----------------
       | Models Layer |
       ----------------
       | Database     |
   ---------------------

Components:
    
Client: The user-facing application or tools that interact with our api.

Custom API: The core server (node.js + Express) handles requests and interacts with spotify and the database.

Database: Stores user data, song metadata, and logs recently played songs.

Spotify OAuth: Enables user authentication and authorization to access Spotify data.

Folder Structure:
.
├── server.js         # Entry point for the server
├── models/           # Sequelize models
│   ├── index.js      # Defines relationships and exports models
│   ├── user.js       # User model
│   ├── songs.js      # Song model
│   ├── recentlyPlayedSongs.js # Recently played songs model
├── routes/           # API route handlers
│   ├── callback.js   # Handles Spotify OAuth callbacks
│   ├── songRoutes.js # CRUD operations for songs
│   ├── userLogin.js  # User login logic
│   ├── userRoutes.js # User-related endpoints
├── database/
│   └── connection.js # Database connection setup
├── logs/
│   └── app.log       # Logging output
├── swagger/
│   └── swagger.json  # Swagger documentation (optional file)
├── package.json      # Dependencies and scripts
├── README.md         # Project overview and instructions

Components Overview

Server (server.js)
Sets up the Express server.
Integrates Swagger UI for API documentation.
Configures middleware for JSON parsing and logging.
Handles application routing via routes.

Routes
![alt text](images/routes.png)

Models
![alt text](images/models.png)


Database
Connection.js: Establishes and configures the database connection using Sequelize.

Swagger Documentation
![alt text](images/swag.png)

Sequence Diagram
User login and Data fetching:
Client                API Server                  Spotify
   |                        |                        |
   |  Login Request         |                        |
   |----------------------->|                        |
   |                        |   Redirect to OAuth    |
   |                        |----------------------->|
   |                        |                        |
   |       Token            |<-----------------------|
   |<-----------------------|                        |
   |  Request for Data       |                        |
   |----------------------->|                        |
   |    Fetch Songs          |                        |
   |----------------------->|                        |
   |<-----------------------|                        |

API Endpoint Overview
![alt text](images/endpoints.png)

Logging:

Log Files: logs/app.log
    Tracks server activity, errors, and warnings.
    Helps with debugging and auditing.

Development Timeline
![alt text](imagestimeline.png)