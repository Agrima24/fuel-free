const mongoose = require("mongoose");
const cartModelSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: "0",
  },
  delivery_Status: {
    type: Boolean,
    required: true,
    default: false,
  },
  payment_Status: {
    type: Boolean,
    required: true,
    default: false,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  required: true,
    ref: "user",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
cartModelSchema.set("timestamps", true);
module.exports = mongoose.model("cart", cartModelSchema);
