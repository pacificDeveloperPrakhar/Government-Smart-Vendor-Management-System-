const express = require("express");
const router = express.Router();
const {
  removeAdmin,
  makeAdmin,
  getAllCompanies,
  deleteCompany,
  newProdcutAdd,
  DeleteProduct,
  getAllProducts,
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controller/admin/adminController");

const {
  allSubmittedApplications,
} = require("../controller/TrainingPrograms/CourseApplicationController");

const {
  allOrders,
  allContactResponses,
} = require("../controller/orders/ToolsSell");

const {
  registercompnay,
  logincompany,
  jobPosting,
  deletejobposting,
} = require("../controller/company/companyController");
// verifyAdmin  middleware
const verifyAdmin = require("../middleware/adminmiddle");
// register admin
router.post("/register", registerAdmin);
// login admin
router.post("/login", loginAdmin);
router.get("/makeAdmin/:userId",makeAdmin)
router.get("/removeAdmin/:userId",removeAdmin)
// logout admin

router.get("/logout", verifyAdmin, logoutAdmin);

// Fetching all companies
router.get("/company", verifyAdmin, getAllCompanies);

// Delete a company
router.delete("/company/:id", verifyAdmin, deleteCompany);

// Get all products
router.get("/all/products", verifyAdmin, getAllProducts);

// Add new product
router.post("/new/products", verifyAdmin, newProdcutAdd);

// Admin delete product
router.delete("/delete/products/:id", verifyAdmin, DeleteProduct);

// Get all submitted training applications
router.get(
  "/training-programs/course-applications",
  verifyAdmin,
  allSubmittedApplications
);

// Get all orders
router.get("/all-orders", verifyAdmin, allOrders);

// Get all contact responses
router.get("/contact-responses", verifyAdmin, allContactResponses);

// company job posting
router.post("/jobposting", verifyAdmin, jobPosting);

// delete job posting
router.delete("/deletejobposting", verifyAdmin, deletejobposting);
module.exports = router;
