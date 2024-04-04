// config.js
import dotenv from 'dotenv';

dotenv.config();

export const dataApiUrl = process.env.MONGO_DATA_API_URL;
export const apiKey = process.env.MONGO_DATA_API_KEY;
export const sessionSecret = process.env.SESSION_SECRET;
export const port = process.env.PORT || 3000;
