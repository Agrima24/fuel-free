const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
reviewSchema.set("timestamps", true);
module.exports = mongoose.model("review", reviewSchema);
