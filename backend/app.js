import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_DATA_API_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: connectMongo.create({
    mongoUrl: MONGO_URI
  })
}));

app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
