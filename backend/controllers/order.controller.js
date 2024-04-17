// order.controller.js

import Order from "../models/order.model.js";
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, MONGO_URI, PORT } from '../config.js';


// Ensure your Stripe API key is correctly loaded from the environment variables
console.log('Stripe secret key:', process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    // Here we create a new order instance using the Order model
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    // Fetching all orders from the database
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    res.status(500).json({ message: error.message });
  }
};

export const handlePayment = async (req, res) => {
  const { amount } = req.body; // Ensure that the amount is sent from the frontend
  console.log("Received amount:", req.body.amount);

  try {
    // Debugging logs to verify the Stripe object and payment intent creation
    console.log('Stripe:', stripe); // Should output the Stripe object
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Converting amount to cents
      currency: 'sek', // Ensure currency is consistent across your app
    });

    // Sending the clientSecret back to the client for payment processing
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


