const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
userSchema.set("timestamps", true);
module.exports = mongoose.model("user", userSchema);
