import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configuring dotenv to load environment variables from 'info.env'
dotenv.config({ path: './.env' });

// Ensuring the environment variables are correctly set
const MONGO_URI = process.env.MONGO_DATA_API_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 3000;

if (!MONGO_URI || !SESSION_SECRET) {
  console.error('Ensure MONGO_DATA_API_URL and SESSION_SECRET are set in info.env');
  process.exit(1); // Exits the app if the environment variables are not set
}

const app = express();

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


// Middleware for parsing JSON bodies
app.use(express.json());

// Initializing session storage with connect-mongo
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: connectMongo.create({
    mongoUrl: MONGO_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true } // Recommended options
  })
}));

// Define your route handlers (example)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serve static files from the 'frontend/build' directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Handling all other requests by serving the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});


// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
