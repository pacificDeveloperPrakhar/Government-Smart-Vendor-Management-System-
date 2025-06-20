const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer transporter
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

module.exports = transport;
