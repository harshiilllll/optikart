const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        img: { type: Array },
        title: { type: String },
        desc: { type: String },
        color: { type: String },
        size: { type: String },
        price: { type: Number },
        oldPrice: { type: Number },
        quantity: { type: Number },
      },
    ],
    quantity: { type: Number },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
