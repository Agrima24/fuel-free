const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  adminPic: {
    type: String,
    required: true,
  },
  adminRole: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
adminSchema.set("timestamps", true);
module.exports = mongoose.model("Admin", adminSchema);
