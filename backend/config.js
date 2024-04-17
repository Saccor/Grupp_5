import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_DATA_API_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const PORT = process.env.PORT || 3000;

// In your config.js, add the following
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
