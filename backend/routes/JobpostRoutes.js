const express=require("express")
const router=express.Router();
const {addJobPost}=require("../controller/Application/JobpostController")
const {sendCustomEmail}=require("../controller/communicationController")
const {authenticateRequest,checkRoles}=require("../controller/Authenticate/profileAuthenticateController")
router.route("/").post(authenticateRequest,checkRoles(["admin","human_resource"]),addJobPost,sendCustomEmail);
module.exports=router;