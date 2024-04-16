<<<<<<< HEAD
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
=======
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
>>>>>>> adamtest
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
<<<<<<< HEAD
    const {title,description,price,images,category,properties} = req.body;
    const productDoc = await Product.create({
      title,description,price,images,category,properties,
    })
=======
    // Use the new field names from the updated schema
    const { name, description, price, inStock, category, image } = req.body;
    const productDoc = await Product.create({
      name, 
      description, 
      price, 
      inStock, 
      category, 
      image,
    });
>>>>>>> adamtest
    res.json(productDoc);
  }

  if (method === 'PUT') {
<<<<<<< HEAD
    const {title,description,price,images,category,properties,_id} = req.body;
    await Product.updateOne({_id}, {title,description,price,images,category,properties});
=======
    // Use the new field names from the updated schema
    const { name, description, price, inStock, category, image, _id } = req.body;
    await Product.updateOne({ _id }, {
      name, 
      description, 
      price, 
      inStock, 
      category, 
      image,
    });
>>>>>>> adamtest
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
<<<<<<< HEAD
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}
=======
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
>>>>>>> adamtest
