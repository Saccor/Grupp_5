// Import necessary modules
import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
// Updated import to reflect changes in config.js
import { MONGO_URI, SESSION_SECRET, PORT } from '../config.js';

// Initialize Express app
const app = express();

// Connect to MongoDB using the updated variable name
mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Initialize session storage with connect-mongo, using the updated variable name
const MongoStore = connectMongo.create({ mongoUrl: MONGO_URI });

app.use(session({
  secret: SESSION_SECRET, // Updated variable name
  resave: false,
  saveUninitialized: true,
  store: MongoStore
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Define your route handlers
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listening on the defined port, using the updated variable name
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
