import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  inStock: Boolean,
  category: String,
  image: String,
});

const Product = mongoose.model('products', productSchema,);

export default Product;
