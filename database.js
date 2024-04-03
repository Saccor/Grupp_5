const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://mehmet:grupp5@webbshop.u8a1wvg.mongodb.net/?retryWrites=true&w=majority&appName=webbshop";

mongoose.connect(uri, {
  dbName: 'mehmet_new',
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
    { name: 'Spinach', price: 17.99, description: 'Organic baby spinach leaves. Washed and ready to eat.', inStock: true },
    { name: 'Almond Milk', price: 10.99, description: 'Organic unsweetened almond milk. Dairy-free, vegan-friendly.', inStock: true },
    { name: 'Granola Bars', price: 15.49, description: 'Mixed berry and nut granola bars. No added sugar, all natural.', inStock: true },
    { name: 'Brown Rice', price: 20.99, description: 'Whole grain brown rice. Gluten-free and a great source of fiber.', inStock: true },
    { name: 'Quinoa', price: 30.99, description: 'Organic quinoa, perfect for salads and side dishes. High in protein.', inStock: true },
    { name: 'Avocado', price: 5.99, description: 'Ripe and creamy avocados. Great for guacamole or as a sandwich topping.', inStock: true }
  ];

  try {
    await Promise.all(products.map(product => new Product(product).save()));
    console.log('All sample products have been added to the database.');
  } catch (error) {
    console.error('Error creating sample products:', error);
  }
};


createSampleProducts();
