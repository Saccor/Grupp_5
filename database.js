const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://saccorezais:grupp5@webbshop.u8a1wvg.mongodb.net/?retryWrites=true&w=majority&appName=webbshop";

mongoose.connect(uri, {
  dbName: 'test1',
  serverApi: ServerApiVersion.v1
}).then(() => console.log('Successfully connected to MongoDB using Mongoose!'))
  .catch(err => console.error('Connection error', err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  inStock: Boolean
});

const Product = mongoose.model('Product', productSchema);

const createSampleProducts = async () => {
  const products = [
    { name: 'Apple', price: 8.99, description: 'Fresh and juicy red apples. Perfect for a healthy snack.', inStock: true },
    { name: 'Loaf of Bread', price: 22.49, description: 'Whole grain bread, freshly baked every morning.', inStock: true },
    { name: 'Cheddar Cheese', price: 44.99, description: 'Aged cheddar cheese, sharp and flavorful. Great for sandwiches.', inStock: true },
    { name: 'Spinach', price: 17.99, description: 'Organic baby spinach leaves. Washed and ready to eat.', inStock: true }
  ];

  try {
    await Promise.all(products.map(product => new Product(product).save()));
    console.log('All sample products have been added to the database.');
  } catch (error) {
    console.error('Error creating sample products:', error);
  }
};

createSampleProducts();
