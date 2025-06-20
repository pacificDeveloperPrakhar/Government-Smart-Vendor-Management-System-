const { env } = require("process");
require("dotenv").config({path:"../config.env"});
const express = require("express");
const DBconnection = require("./config/mongo");
const path = require("path");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const {session}=require("./utils/session_storage")
const fileUpload = require("express-fileupload");
const globalErrorHandlerMiddleware=require("./utils/globalErrorHandlerMiddleware")
// routes
const studentRoutes = require("./routes/studentRoutes");
const profileRoute=require('./routes/profileRoute')
const CompanyRoutes = require("./routes/companyRoutes");
const ToolsSellerRoutes = require("./routes/ToolSellRoute");
const ConstactOwnerRoutes = require("./routes/ownerContact");
const notificationRoutes = require("./routes/notificationRoutes");
const CourseApplicationRoutes = require("./routes/CourseApplicationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const jobRoutes=require("./routes/JobpostRoutes");
const {imageExtractAWS,uploadAWS_SERVER}=require("./utils/imageExtractAWS")
const catchAsync=require("./utils/catchAsync")
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static_files",express.static(path.join(__dirname, "public")));
app.use(cookieParser());
// connection to database
DBconnection();

// cors settings
app.use(
  cors({
    origin: "http://localhost:5173", 
    // origin:"http://localhost:5500",
    credentials: true,
  })
);
app.use(session);

// Define routes
app.use("/registration/jobposts",jobRoutes)
app.use("/registration/studentRoutes", studentRoutes);
app.use("/registration/companyRoutes", CompanyRoutes);
app.use("/toolsell", ToolsSellerRoutes);
app.use("/constact-owner", ConstactOwnerRoutes);
app.use("/training", CourseApplicationRoutes);
app.use("/api", notificationRoutes);
app.use("/admin", adminRoutes);
app.use("/profile",profileRoute)
app.route("/storage/*").get(imageExtractAWS).post(uploadAWS_SERVER.single("file"),catchAsync(async function(req,res,next){return res.status(200).send(req.acess_url)}))
app.use(globalErrorHandlerMiddleware)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
