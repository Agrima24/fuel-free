const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    PhoneNo: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Date :{
        type : String,
        required : true,
    },
    time :{
        type : Number,
    },
    Message :{
       type : String,
       required : true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  });
  enquirySchema.set("timestamps", true);
  module.exports = mongoose.model("enquiry", enquirySchema);