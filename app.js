// Import required modules
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose');


// Initialize dotenv to load environment variables
console.log('Mongo URL:', process.env.MONGO_URL);

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json());  // For parsing JSON data

// Serve static files from the 'public' directory
app.use(express.static('public')); // Ensure this line is included

// Use CORS
app.use(cors());

// Example of a simple route
app.get('/', (req, res) => {
    res.send('Welcome to Robotica Website Backend!');
});

// Import route files (Ensure paths are correct)
const authRoutes = require('./routes/auth');

// Use routes
app.use('/auth', authRoutes); // This handles authentication routes

// Set up a MongoDB connection (Replace with your MongoDB URL in .env)
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

// Start the server on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, '172.27.69.194' () => {
    console.log(`Server is running on port ${PORT}`);
});
console.log('JWT Secret:', process.env.JWT_SECRET_KEY);
