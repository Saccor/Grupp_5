import mongoose from 'mongoose';
import { MONGO_URI } from '../../config.js';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  inStock: Boolean,
});

const Product = mongoose.model('test4', productSchema, 'products');

export default Product;
