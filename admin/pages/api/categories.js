// /api/categories
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Product.distinct("category");
      // Send back the list of categories wrapped in an object with a success flag
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    // If any other HTTP method is used, return a 405 Method Not Allowed error
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
