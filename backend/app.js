import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from './routes/payment.route.js';

dotenv.config();

const app = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS
app.use(cors({
    origin: [`http://localhost:3000`, `http://127.0.0.1:3000`]
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Use routes
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
