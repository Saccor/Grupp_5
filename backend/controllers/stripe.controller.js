// controllers/stripe.controller.js
import stripeService from '../services/stripe.Service.js';
import Order from '../models/order.model.js';

export const handleStripePayment = async (req, res) => {
  const { total, currency } = req.body;

  try {
    const paymentIntent = await stripeService.createPaymentIntent(total, currency);
    // You might want to save details to the database before sending response
    const newOrder = new Order({ ...req.body, paymentStatus: 'Unpaid' });
    await newOrder.save();
    
    res.status(201).json({ success: true, paymentIntentId: paymentIntent.id, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
