import mongoose from 'mongoose';
import Order from '@/models/Order'; // Ensure this path matches the actual location
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect();

  switch (req.method) {
    case 'GET':
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders." });
      }
      break;

    case 'PUT':
      const { orderId, updates } = req.body; // expect updates to be an object with updated fields
      try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });
        if (!updatedOrder) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
      } catch (error) {
        res.status(500).json({ error: "Failed to update the order." });
      }
      break;

    case 'DELETE':
      const { orderId: deleteOrderId } = req.body;
      try {
        const deletedOrder = await Order.findByIdAndDelete(deleteOrderId);
        if (!deletedOrder) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete the order." });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
