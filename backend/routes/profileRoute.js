const express = require("express");
const {
  signup,
  tokenGenerator,
  authenticateVerification,
  issueAuthenticationToken,
  login,
  authenticateRequest,
} = require("../controller/Authenticate/profileAuthenticateController");
const { sendMail } = require("../controller/communicationController");


// Multer configuration
const { uploadLocal } = require("../utils/multerConfig");

const router = express.Router();

// Profile Routes
router.post("/signup", signup, tokenGenerator, sendMail);
router.get("/signup/:verification_factor", signup, authenticateVerification, issueAuthenticationToken);
router.post("/login", login, issueAuthenticationToken);
router.post("/updateProfile", authenticateRequest, uploadLocal.single("images"), (req,res,next)=>{
  res.send(req.files)
});
router.get("/verify", authenticateRequest, (req, res) => {
  res.send("Profile verification successful.");
});
// router.get("/logout", authenticateRequest, logout);

module.exports = router;
