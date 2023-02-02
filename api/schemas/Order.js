const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [
      {
        productId: { type: String },
        title: { type: String },
        desc: { type: String },
        color: { type: String },
        size: { type: String },
        quantity: { type: Number },
        img: { type: Array },
        price: { type: Number },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    payment_status: { type: String, required: true },
    delivery_status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
