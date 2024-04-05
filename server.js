// Import necessary modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import { MONGO_URI, SESSION_SECRET, PORT } from './config.js';
import routes from './backend/app.js';

// Configuring dotenv to ensure environment variables are loaded
dotenv.config({ path: './info.env' });

const app = express();

// MongoDB connection using MONGO_URI from config
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Initialize session storage with connect-mongo using the MongoDB connection
const MongoStore = connectMongo.create({ mongoUrl: MONGO_URI });
app.use(session({
  secret: SESSION_SECRET, // Use the secret from the environment variable
  resave: false,
  saveUninitialized: true,
  store: MongoStore // Configure MongoDB store for session data
}));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Setup API routes from a separate file for cleaner code
app.use('/api', routes);

// Serve static files from the 'frontend/build' directory for the frontend application
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Determine the directory name of the current module
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handle all other requests by serving the main index.html, enabling SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server on the configured port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
