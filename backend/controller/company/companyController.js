const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VerificationFactor = require("../../model/verifiaction_factor");
const catchAsync = require("../../utils/catchAsync");
const appErrors = require("../../utils/appErrors");
const Company = require("../../model/RegisterCompany");
const JobPost = require("../../model/Job");
const { saveNotification } = require("../notification/NotificationsFunction");
const { loginCompany } = require("../Authenticate/companyAuthenticateController");
const { emailFetcher } = require("../../utils/emailUtilities");
const secret = process.env.SESSION_KEY;
// Register company
const registercompany = catchAsync(async (req, res, next) => {
    const {
        cin,
        email,
        companyName,
        phone,
        panGst,
        address,
        website,
        socialMedia
    } = req.body;
    const existingCompany = await Company.findOne({
        $or: [
            { email },
            { cin },
            { panGst }
        ]
    });

    if (existingCompany&&existingCompany.isVerified) {
        return next(new appErrors("Company already exists", 400));
    }
    if(existingCompany&&!existingCompany.isVerified)
      await Company.findOneAndDelete({email:existingCompany.email});
    if (!email || !companyName || !cin || !panGst) {
        return next(new appErrors("Missing required fields", 400));
    }


    const newCompany = await Company.create({
        companyName,
        cin,
        panGst,
        email,
        phone,
        address,
        website,
        socialMedia,
        contactPerson: req.profile._id,
        companyLogo:req.access_url.companyLogo,
        documents:req.access_url.documents,
        isVerified: req.profile.isAdmin || false
    });
    

    req.token = jwt.sign({ email:newCompany.email, id: newCompany._id }, secret);
    const verification=  await VerificationFactor.create({
        companyID: newCompany._id,
        value: req.token,
      });

    const root = `${req.protocol}://${req.get("host")}${req.originalUrl}`
    const parentRoute = root.split("/").slice(0, -1).join("/");
    let redirectUri =  `${parentRoute}/verifyCompany/${verification._id}`;
    const subject=!req.profile.isAdmin?`New Company Registration Pending Approval – Action Required, ${companyName} follow this link: ${redirectUri}`:`New company has been registered ,name:${newCompany.companyName},email:${newCompany.email}`;
    req.body.to = await emailFetcher(newCompany.contactPerson);
    req.companyVerification=req.profile.isAdmin?true:false;
    req.body.from = process.env.EMAIL_ID;
    req.body.subject = subject;
    req.body.url = redirectUri;
    req.company=newCompany;
    req.response=req.profile.isAdmin?`new company has been created successfully`:`email has been sent to ${req.body.to}`
    return next();
});

// Login company
const logincompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: company._id, email: company.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutCompany = (req, res) => {
  try {
    // clear the cookie
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Job posting
const jobPosting = catchAsync(async (req, res, next) => {
    const { title, description, department, salary, type, location } = req.body;

    if (!title || !description || !department) {
        return next(new appErrors("Missing required job fields", 400));
    }

    const job = await JobPost.create({
        title,
        description,
        salary,
        location,
        type,
        department,
        company: req.company._id // Associate job with company
    });

    // Save notification for new job posting
    await saveNotification(
        "job",
        `New job posted: ${title} by ${req.company.companyName}`
    );

    res.status(201).json({
        status: "success",
        message: "Job posted successfully",
        data: {
            job
        }
    });
});

// Delete job posting
const deletejobposting = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const job = await JobPost.findOne({
        _id: id,
        company: req.company._id // Ensure job belongs to company
    });

    if (!job) {
        return next(new appErrors("Job not found or unauthorized", 404));
    }

    await job.remove();

    res.status(200).json({
        status: "success",
        message: "Job deleted successfully"
    });
});

// Update company profile
const updateCompany = catchAsync(async (req, res, next) => {
    const allowedUpdates = [
        'companyName',
        'phone',
        'address',
        'website',
        'socialMedia'
    ];

    const updates = Object.keys(req.body)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
            obj[key] = req.body[key];
            return obj;
        }, {});

    if (Object.keys(updates).length === 0) {
        return next(new appErrors("No valid update fields provided", 400));
    }

    const company = await Company.findByIdAndUpdate(
        req.company._id,
        updates,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        status: "success",
        data: {
            company
        }
    });
});

module.exports = {
    registercompany,
    jobPosting,
    deletejobposting,
    logincompany,
    updateCompany
};
