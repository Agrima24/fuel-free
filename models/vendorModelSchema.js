const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
  },
  vendorEmail: {
    type: String,
    required: true,
  },
  vendorPassword: {
    type: String,
    required: true,
  },
  vendorPic: {
    type: String,
  },
  role: {
    type: String,
    default: "vendor",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
vendorSchema.set("timestamps", true);
module.exports = mongoose.model("vendor", vendorSchema);
