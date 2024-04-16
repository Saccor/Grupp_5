import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";
import { handlePayment } from '../controllers/order.controller.js';

const orderRoutes = express.Router();

orderRoutes.post("/orders", createOrder);
orderRoutes.get("/orders", getAllOrders);
orderRoutes.post('/payments', handlePayment);

export default orderRoutes;
