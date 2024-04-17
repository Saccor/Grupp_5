import dotenv from 'dotenv';
dotenv.config();

// Ensure that these variable names match exactly with those in your .env file
export const MONGO_URI = process.env.MONGODB_URI; // Changed from MONGO_DATA_API_URL to MONGODB_URI if that's what's in your .env
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const PORT = process.env.PORT || 3000;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY; // Adding Stripe secret key here for centralized management

// Exporting Stripe for centralized configuration (optional)
import Stripe from 'stripe';
export const stripe = new Stripe(STRIPE_SECRET_KEY);

