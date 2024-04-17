import express from "express";
import { createOrder, getAllOrders, handlePayment } from "../controllers/order.controller.js";

// Create a router object
const orderRoutes = express.Router();

// Route to handle creation of new orders
// POST /api/orders
orderRoutes.post("/orders", (req, res) => {
  console.log("Attempting to create an order with data:", req.body);  // Log the incoming order data
  createOrder(req, res);
});

// Route to retrieve all orders
// GET /api/orders
orderRoutes.get("/orders", (req, res) => {
  console.log("Fetching all orders");  // Log the action of fetching all orders
  getAllOrders(req, res);
});

// Route to handle payment processing
// POST /api/payments
orderRoutes.post('/api/payments', (req, res) => {
  console.log("Processing payment with data:", req.body);  // Log the payment attempt details
  handlePayment(req, res);
});

// Export the router
export default orderRoutes;
