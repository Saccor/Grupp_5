import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

const paymentDetailsSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true, select: false },
  cvv: { type: String, required: true, select: false },
  expiryDate: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  customer: customerSchema,
  paymentDetails: paymentDetailsSchema,
  paymentStatus: {
    type: String,
    default: "Unpaid",
    enum: ["Paid", "Unpaid"]
  },
  total: { type: Number, required: true },
  totalIncludingVAT: { type: Number, required: true },
  paid: { type: Boolean, default: false },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
