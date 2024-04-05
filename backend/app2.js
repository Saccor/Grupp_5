// Import necessary libraries and configuration using ES6 import syntax
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import axios from 'axios';
import { dataApiUrl, apiKey, sessionSecret, port } from './config.js'; // Ensure this path matches the location of your config.js

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // Using express.json() as bodyParser.json() is deprecated

// Connect to MongoDB - Assuming you have a mongoose connection setup in your config.js or similar
mongoose.connect(dataApiUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  user: 'saccorezais', // Consider moving sensitive info to your config
  pass: 'grupp5', // Same as above
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const MongoStore = connectMongo(session);

// Session middleware setup using modern JavaScript features
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Define your route handlers - Example placeholder route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example route using Axios and MongoDB Data API with async/await syntax
app.get('/data-api/items', async (req, res) => {
  try {
    const response = await axios.post(`${dataApiUrl}/action/find`, {
      collection: 'test4', // Replace with your actual collection name
      database: 'webbshop', // Replace with your actual database name
      dataSource: 'webbshop', // Replace with your actual data source/cluster name
      filter: {} // Customize your filter as needed
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      }
    });

    res.json(response.data.documents);
  } catch (error) {
    console.error('Error fetching items with MongoDB Data API:', error);
    res.status(500).json({ message: 'Failed to fetch items', error: error.message });
  }
});

// Listening on the port defined in the configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
