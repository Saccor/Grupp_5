import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configuring dotenv to load environment variables
dotenv.config({ path: './info.env' });

// Correcting the environment variable names according to your .env file
const MONGO_URI = process.env.MONGO_DATA_API_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 3000;

const app = express();

// Establishing connection to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Initializing session storage with connect-mongo
const MongoStore = connectMongo.create({ mongoUrl: MONGO_URI });
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore
}));

// Middleware for parsing JSON bodies
app.use(express.json());

// Define your route handlers (example)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serve static files from the 'frontend/build' directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handling all other requests by serving the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
