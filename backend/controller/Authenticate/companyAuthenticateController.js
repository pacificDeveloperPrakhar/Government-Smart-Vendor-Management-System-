const Company = require("../../model/RegisterCompany");
const VerificationFactor = require("../../model/verifiaction_factor");
const catchAsync = require("../../utils/catchAsync");
const { createResetTokenPassword, compareResetToken } = require("../../utils/validateProfile");
const appError = require("../../utils/appErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SESSION_KEY;

exports.registerCompany = catchAsync(async function (req, res, next) {
    const { verification_factor } = req.params;
    if (verification_factor) return next();

    const { 
        companyName, 
        cin, 
        panGst, 
        email, 
        phone, 
        address, 
        website, 
        password, 
        confirmPassword,
        socialMedia 
    } = req.body;

    const token = jwt.sign({ email, companyName }, secret);

    let company = await Company.findOne({ email });
    if (company?.verification_details?.isVerified)
        return next(new appError("Company with this email is already registered", 400));
    
    await Company.deleteOne({ email });
    company = 0;

    if (!company) {
        const hashPassword = await bcrypt.hash(password, 10);
        company = await Company.create({
            companyName,
            cin,
            panGst,
            email,
            phone,
            address,
            website,
            password: hashPassword,
            socialMedia,
            contactPerson: req.profile._id
        });
    }

    res.setHeader("Authorization", `Bearer ${token}`);
    req.session.token = token;
    req.session.companyId = company._id;
    req.isSignup = true;
    req.company = company;

    next();
});

exports.tokenGenerator = catchAsync(async function (req, res, next) {
    // Similar to profile tokenGenerator but for company
    const { email } = req.body;
    const companyId = req.session.companyId;
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
        return next(new appError("No company found with this email.", 400));
    }

    const { resetToken: tokenString } = await createResetTokenPassword({ email });
    const payload = { email: company.email, token: tokenString };
    const token = jwt.sign({ ...payload, id: req.session.companyId }, secret, { expiresIn: "1h" });

    await VerificationFactor.deleteMany({ companyID: req.session.companyId });

    const verification_obj = await VerificationFactor.create({
        companyID: req.session.companyId,
        value: token,
    });

    const root = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const parentRoute = root.split("/").slice(0, -1).join("/");
    let redirectUri = req.isSignup
        ? `${parentRoute}/verify/${verification_obj.id}`
        : `${parentRoute}/verifyCompany/${verification_obj.id}`;

    req.body.to = email;
    req.body.from = process.env.MAIL_FROM;
    req.body.subject = `Verify your company email: ${redirectUri}`;
    req.body.url = redirectUri;

    next();
});

exports.loginCompany = catchAsync(async function (req, res, next) {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });

    if (!company) {
        return next(new appError("No company found with this email.", 400));
    }

    const isValidPassword = await bcrypt.compare(password, company.password);
    if (!isValidPassword) {
        return next(new appError("Invalid password.", 400));
    }

    const token = jwt.sign(
        { id: company._id, email: company.email },
        secret,
        { expiresIn: "1h" }
    );

    req.token = token;
    req.company = company;

    next();
});

exports.authenticateCompanyRequest = catchAsync(async function (req, res, next) {
    const token = req.session.token;

    if (!token) {
        return next(new appError("No authentication token found.", 401));
    }

    const { email } = jwt.decode(token);
    const isVerified = jwt.verify(token, secret);
    const company = await Company.findOne({ email });

    if (!company) {
        return next(new appError("Company not found or has been deleted.", 400));
    }

    if (!isVerified) {
        return next(new appError("Token is invalid or expired. Please log in again.", 400));
    }

    req.company = company;
    next();
});
