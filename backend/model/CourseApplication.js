// Course ApplicationController model
const mongoose = require("mongoose");

const courseApplicationSchema = new mongoose.Schema(
  {
    // name, email, phone, message
    name: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("courseApplication", courseApplicationSchema);
