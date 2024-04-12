import mongoose, {model, Schema, models} from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  inStock: Boolean,
});

export const Product = models.Product || model('Product', ProductSchema);