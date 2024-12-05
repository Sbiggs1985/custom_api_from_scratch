const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/spotifyAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define a schema for tracks
const trackSchema = new mongoose.Schema({
    trackId: String,
    name: String,
    artists: [String],
    album: String,
    duration: Number, // in milliseconds
    addedAt: { type: Date, default: Date.now },
});

// Create a model for tracks
const Track = mongoose.model('Track', trackSchema);

module.exports = { mongoose, Track };
