import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Configuring dotenv to dynamically load environment variables from '.env'
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Ensuring the environment variables are correctly set
const MONGO_URI = process.env.MONGO_DATA_API_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 3000;

if (!MONGO_URI || !SESSION_SECRET) {
  console.error('Ensure MONGO_DATA_API_URL and SESSION_SECRET are set in .env');
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
    mongoUrl: MONGO_URI
  })
}));

// API routes go here
// Example:
// app.use('/api/products', productsRouter);

// Serve static files from the React frontend app
const frontendPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
