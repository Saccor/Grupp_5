import mongoose from 'mongoose';
import Order from '@/models/Order'; // Ensure this path matches the actual location
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect(); // Make sure the database connection is established
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
}
