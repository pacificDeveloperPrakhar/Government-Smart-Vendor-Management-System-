const express = require("express");
const {
  registerStudent,
  studentApplyJob,
  logout,
} = require("../controller/student/studentController");
const {signup,tokenGenerator,authenticateVerification, issueAuthenticationToken,login, authenticateRequest}=require("../controller/Authenticate/AuthenticateController")
const {sendMail} =require("../controller/communicationController")
const router = express.Router();

// Multer configuration
const {uploadLocal}=require("../utils/multerConfig")

// middleware
const Authverify = require("../middleware/auth");
// Register a new student
router.post("/register", registerStudent);

router.get("/signup/:verification_factor",signup,authenticateVerification,issueAuthenticationToken)
router.post("/signup",signup,tokenGenerator,sendMail)
// Login a student
router.post("/login", login,issueAuthenticationToken);
router.post("/updateCurrentlySessionedUser",authenticateRequest,uploadLocal.single("images"),(req,res,next)=>{
  res.send(req.files)
})
router.get("/verify",authenticateRequest,(req,res)=>{
  res.send("this is where i have done")
})
// Logout a student
router.get("/logout", authenticateRequest, logout);

// application job
// router.post("/applyjob", Authverify, upload.single("resume"), studentApplyJob);

module.exports = router;
