// admin controller
const Company = require("../../model/RegisterCompany");
const Product = require("../../model/product");
const Admin = require("../../model/Admin");
const bcrypt = require("bcrypt");
const Profile=require("../../model/profile");
const appError=require("../../utils/appErrors")
const jwt = require("jsonwebtoken");
const catchAsync=require("../../utils/catchAsync");
const profiles = require("../../model/profile");
require("dotenv").config();
// addmin do this all

const registerAdmin = async (req, res) => {
  try {
    const { username, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check
    if (await Admin.findOne({ username })) {
      return res.status(400).json({ error: "Admin username already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 8);
    const newAdmin = new Admin({ username, password: hashPassword, role });

    // Save
    await newAdmin.save();
    // Generate JWT token
    const token = jwt.sign({ newAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    // Set the token in the cookie
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
// Login admin
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token for admin
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// admin logout

const logoutAdmin = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fetch all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    // console.log(companies);
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// delete company

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getAllProduct

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// new product add
const newProdcutAdd = async (req, res) => {
  const { name, description, image, price, instock } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      image,
      price,
      instock,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to add product", error: err.message });
  }
};

// delete the product
const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: err.message });
  }
};

//
const makeAdmin = catchAsync(async function (req, res, next) {
  const { userId } = req.params;
  
  const person = await Profile.findById(userId);
  if (!person)
    return next(new appError(`This user with ID ${userId} is not available`, 400));

  const updatedRoles = ["admin", ...(person.role || [])];

  const data = await Profile.findByIdAndUpdate(
    userId,
    { role: updatedRoles },
    { new: true }
  );

  res.status(201).json({
    status: "ok",
    data: { profile: data },
  });
});

const removeAdmin = catchAsync(async function (req, res, next) {
  const { userId } = req.params;
  
  const person = await Profile.findById(userId);
  if (!person)
    return next(new appError(`This user with ID ${userId} is not available`, 400));
  if(!person?.verification_details?.isVerified)
    return next(new appError(`This user with ID ${userId} is not verified`, 400));

  const updatedRoles = (person.role || []).filter((ele) => ele !== "admin");

  const data = await Profile.findByIdAndUpdate(
    userId,
    { role: updatedRoles },
    { new: true }
  );

  res.status(201).json({
    status: "ok",
    data: { profile: data },
  });
});

module.exports = {
  removeAdmin,
  makeAdmin,
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAllCompanies,
  deleteCompany,
  newProdcutAdd,
  DeleteProduct,
  getAllProducts,
};
