// services/stripeService.js
import stripe from '../stripeConfig.js';

const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Stripe Service Error:', error);
    throw error;
  }
}

export default {
  createPaymentIntent,
};
