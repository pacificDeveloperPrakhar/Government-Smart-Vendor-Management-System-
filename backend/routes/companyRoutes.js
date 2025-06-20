const express = require("express");
const router = express.Router();
const {uploadAWS_SERVER}=require("../utils/imageExtractAWS")
const {
  registercompany,
  logincompany,
  jobPosting,
  logoutCompany,
  deletejobposting,
} = require("../controller/company/companyController");
const {authenticateRequest,checkRoles}=require("../controller/Authenticate/profileAuthenticateController")
const {sendCustomEmail}=require("../controller/communicationController")
//  middleware
const Authverify = require("../middleware/auth");
// register company
router.post("/register",authenticateRequest,checkRoles(['admin','human_resource']) ,uploadAWS_SERVER.fields([
  { name: 'companyLogo', maxCount: 1 }, 
  { name: 'documents', maxCount: 5 }   
]),registercompany,sendCustomEmail);
// login company
router.post("/login", authenticateRequest,checkRoles(['admin','human_resource']),logincompany);


// company job posting
router.post("/jobposting", Authverify, jobPosting);

// delete job posting
router.delete("/deletejobposting", Authverify, deletejobposting);

module.exports = router;
