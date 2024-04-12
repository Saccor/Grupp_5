// pages/api/products.js
import clientPromise from '../../lib/mongodb'; // Update the relative path accordingly

export default async function handler(req, res) {
  try {
    // Get the client from the promise
    const client = await clientPromise;

    // Connect to the database
    const db = client.db(); // If you have a specific database name, pass it as a parameter here

    // Fetch the products from the database
    const products = await db
      .collection('test') // Replace 'products' with your actual collection name
      .find({}) // Add query parameters if needed
      .toArray(); // Convert the result to an array

    // Return the products in the response
    res.status(200).json({ products });
  } catch (e) {
    // If an error occurs, return a 500 error and log the error to the console
    console.error(e);
    res.status(500).json({ error: 'Unable to fetch the products' });
  }
}
