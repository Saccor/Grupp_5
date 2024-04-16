// order.controller.js

import Order from "../models/order.model.js";
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updated function to handle payment using Payment Intents API
export const handlePayment = async (req, res) => {
  const { amount } = req.body; // Ensure that amount is being sent from the frontend

  try {
    // Create a payment intent
    const PaymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: 'sek', // Replace 'sek' with your currency if different
      // Add any other parameters needed for your payment process
    });

    // Send the clientSecret back to the client
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Make sure to export the handlePayment function if it's not already exported
