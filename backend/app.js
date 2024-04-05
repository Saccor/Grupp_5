// Import necessary modules
import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import { dataApiUrl, sessionSecret, port } from './config.js'; // Ensure these are correctly defined in config.js

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(dataApiUrl)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Initialize session storage with connect-mongo
const MongoStore = connectMongo.create({ mongoUrl: dataApiUrl });

app.use(session({
  secret: sessionSecret,
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

// Listening on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
