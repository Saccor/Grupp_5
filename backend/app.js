import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../mongoose_server/server.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

// Connect to MongoDB
const uri = process.env.MONGODB_URI;

console.log('MongoDB URI:', uri);


mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

  app.use(cors());

app.use('/api', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
