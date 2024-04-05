// Import necessary modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './app2.js';


// Load environment variables from .env file
dotenv.config({ path: './info.env' });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Construct __dirname equivalent in ES module scope
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/api', routes);


// Serve the static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handles any requests, sending back the main index.html file from 'frontend/build'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

