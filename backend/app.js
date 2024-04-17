import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";



const app = express();

app.use(cors({
    origin: [`http://localhost:3000`, `http://127.0.0.1:3000`, `https://yourfrontenddeploymenturl.com`]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added from server.js

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Use routes
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Rest of the code for Stripe integration or any other setup if required

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // Export is not necessary if this is your entry file
