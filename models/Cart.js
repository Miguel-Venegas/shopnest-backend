const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true },

  quantity: { 
    type: Number,
    min: 1,
    default: 1 }
});


const CartSchema = new mongoose.Schema(
  {
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
