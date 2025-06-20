const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
dotenv = require("dotenv");
require("dotenv").config();

// Middleware
const Authverify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "user not unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.json({ message: "user not unauthorized" });
    }
    req.user = decode;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
    return;
  }
};
module.exports = Authverify;
