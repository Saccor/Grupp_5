import mongoose from 'mongoose';
import Order from '@/models/Order'; // Ensure this path matches the actual location
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders." });
    }
  } else if (req.method === 'PUT') {
    const { orderId, paid } = req.body;
    try {
      const paymentStatus = paid ? "Paid" : "Unpaid"; // Determine the paymentStatus based on the paid boolean
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { paid: paid, paymentStatus: paymentStatus }, // Update both paid and paymentStatus
        { new: true }
      );
      if (!updatedOrder) {
        res.status(404).send('Order not found');
      } else {
        res.status(200).json(updatedOrder);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update the order." });
    }
  }  
}
