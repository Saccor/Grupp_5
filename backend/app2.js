// Assuming ES6 import syntax is supported in your environment
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios'; // Import axios for making HTTP requests

dotenv.config();

const MongoStore = connectMongo(session);

// Import your routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// New Route for MongoDB Data API Example
app.get('/api/data-api/items', async (req, res) => {
  const dataApiUrl = process.env.MONGO_DATA_API_URL; // Ensure this is in your .env
  const apiKey = process.env.MONGO_DATA_API_KEY; // Ensure this is in your .env
  const collectionName = 'your_collection_name'; // Replace with your actual collection name
  const databaseName = 'your_database_name'; // Replace with your actual database name
  const dataSource = 'your_cluster_name'; // Replace with your actual data source/cluster name

  try {
    const response = await axios.post(`${dataApiUrl}/action/find`, {
      collection: collectionName,
      database: databaseName,
      dataSource: dataSource,
      filter: {} // Customize your filter as needed
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      }
    });

    res.json(response.data.documents); // Sending back the documents received from MongoDB
  } catch (error) {
    console.error('Error fetching items with MongoDB Data API:', error);
    res.status(500).json({ message: 'Failed to fetch items', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
