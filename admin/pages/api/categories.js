// /api/categories
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    try {
      // Retrieve all unique categories from the products collection
      const categories = await Product.distinct("category");
      res.status(200).json(categories); // Send back the list of categories
    } catch (error) {
      // Log the error and send a server error status
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Protect the other methods with isAdminRequest
    await isAdminRequest(req, res);
    
    if (method === 'POST') {
      try {
        const { name } = req.body;
        const category = await Product.create({ name });
        res.status(201).json(category);
      } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    if (method === 'PUT') {
      try {
        const { _id, name } = req.body;
        const category = await Product.updateOne({ _id }, { name });
        res.status(200).json(category);
      } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    if (method === 'DELETE') {
      try {
        const { _id } = req.query;
        await Product.deleteOne({ _id });
        res.status(200).json({ message: 'Category deleted successfully' });
      } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}