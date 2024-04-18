import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    paymentDetails: {
      cardNumber: { type: String, required: true, select: false }, // Should be encrypted
      cvv: { type: String, required: true, select: false }, // Should be encrypted
      expiryDate: { type: String, required: true },
    },
    paymentStatus: {
      type: String,
      default: "Unpaid",
      enum: ["Paid", "Unpaid"],
    },
    tax: { type: Number, required: true },
    totalIncludingVAT: { type: Number, required: true }, // total price including Value added Tax
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
