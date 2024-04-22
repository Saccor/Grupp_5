import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const { name, description, price, inStock, image,category} = req.body;
    const productDoc = await Product.create({
      name,description,price,inStock, category, image,
    })
    res.json(productDoc);
  }


  if (method === 'PUT') {
    const {
        _id, // Ensure you're using _id as the identifier
        name, 
        description, 
        price, 
        images, // Check if this should be 'image' based on your schema
        category, 
        inStock
    } = req.body;

    if (!_id) {
        return res.status(400).json({ message: 'Product ID (_id) must be provided.' });
    }

    try {
        // Attempt to update the product
        const updateResult = await Product.updateOne(
            { _id },
            { name, description, price, inStock, category, image: images }, // Make sure to adjust 'images' to 'image' if necessary
            { new: true, runValidators: true } // Ensure that model validations are applied
        );

        // Check if the update was successful
        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: 'Product not found or no updates made.' });
        }

        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({ message: 'Failed to update product.', error: error.toString() });
    }
}



  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
