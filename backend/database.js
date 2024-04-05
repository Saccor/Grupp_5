import mongoose from 'mongoose';
import { MONGO_URI } from '../config.js';

// Assuming you have models like 'Product' to export
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  inStock: Boolean,
});

const Product = mongoose.model('Product', productSchema);

export { Product };
