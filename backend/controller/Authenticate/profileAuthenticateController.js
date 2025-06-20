const Profile = require("../../model/profile");
const VerificationFactor = require("../../model/verifiaction_factor");
const catchAsync = require("../../utils/catchAsync");
const { createResetTokenPassword, compareResetToken } = require("../../utils/validateProfile");
const appError = require("../../utils/appErrors");
const jwt = require("jsonwebtoken");

const secret = process.env.SESSION_KEY;

// **Signup Controller**
exports.signup = catchAsync(async function (req, res, next) {
  
  const { verification_factor } = req.params;
  let {role}=req.query;
  if(role)
  {

    role=[...role]
    role=role?.filter((r)=>r!=="admin")
  }
  else
  role=[]
  if (verification_factor) return next();

  const { fullName, email, confirmPassword, password, address, phone } = req.body;
  const token = jwt.sign({ email, fullName }, secret);

  let profile = await Profile.findOne({ email });
  console.log(profile)
  if(profile?.verification_details?.isVerified)
    return next(new appError("profile with this email is already registered",400));
  await Profile.deleteOne({email})
  profile=0;
  if (!profile) {
    profile = await Profile.create({
      fullName,
      email,
      password,
      confirmPassword,
      role,
      address,
      phone,
    });
  }

  res.setHeader("Authorization", `Bearer ${token}`);
  req.session.token = token;
  req.session.userId = profile._id;
  req.isSignup = true;
  req.profile = profile;

  next();
});

// **Token Generation for Verification**
exports.tokenGenerator = catchAsync(async function (req, res, next) {
  const { email } = req.body;
  const userId = req.session.userId;
  const profile = await Profile.findOne({ _id: userId });

  if (!profile) {
    return next(new appError("No profile found with this email.", 400));
  }

  const { resetToken: tokenString } = await createResetTokenPassword({ email });

  const payload = { email: profile.email, token: tokenString };
  const token = jwt.sign({ ...payload, id: req.session.userId }, secret, { expiresIn: "1h" });

  // **Invalidate previous verification tokens**
  await VerificationFactor.deleteMany({ profileID: req.session.userId });

  // **Create new verification factor**
  const verification_obj = await VerificationFactor.create({
    profileID: req.session.userId,
    value: token,
  });

  console.log(verification_obj);

  // **Generate verification link**
  const root = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const parentRoute = root.split("/").slice(0, -1).join("/");
  let redirectUri = req.isSignup
    ? `${parentRoute}/signup/${verification_obj.id}`
    : `${parentRoute}/verifyProfile/${verification_obj.id}`;

  req.body.to = email;
  req.body.from = "prakharvision@gmail.com";
  req.body.subject = `To verify your email or reset password, follow this link: ${redirectUri}`;
  req.body.url = redirectUri;

  next();
});

// **Verification Controller**
exports.authenticateVerification = catchAsync(async function (req, res, next) {
  const { verification_factor } = req.params;
  const verification_obj = await VerificationFactor.findOne({ _id: verification_factor });
  if (!verification_obj) {
    return next(new appError("Verification link expired or invalid.", 400));
  }

  let profile = await Profile.findOne({ _id: verification_obj.profileID });

  if (!verification_obj.isValid || verification_obj.isUsed) {
    return next(new appError(`Verification link ${verification_obj.isUsed ? "has been used" : "expired"}.`, 400));
  }

  if (!profile) {
    return next(new appError("Profile linked to this verification no longer exists.", 400));
  }

  try {(!jwt.verify(verification_obj.value, secret))} 
  catch(err){
    return next(new appError("Invalid JWT token ", 403));
  }

  const { email, token } = jwt.decode(verification_obj.value, secret);

  if (!(await compareResetToken({ email, providedToken: token }))) {
    return next(new appError("Token is invalid.", 403));
  }

  // **Update Profile Verification Status**
  profile = await Profile.findByIdAndUpdate(profile._id, { $set: { "verification_details.isVerified": true } }, { new: true });

  // **Invalidate verification token**
  await VerificationFactor.findOneAndUpdate({ profileID: profile._id }, { $set: { isValid: false, isUsed: true } });

  console.log(profile);
  req.profile = profile;
  req.token = jwt.sign({ email, id: profile._id }, secret);

  next();
});

// **Issue Authentication Token**
exports.issueAuthenticationToken = catchAsync(async (req, res, next) => {
  req.session.token = req.token;
  req.session.isAuthenticated = true;
  req.session.profile = req.profile;
  req.session.save();
  if(req.url.includes("signup"))
  return res.status(200).redirect("/static_files/verified_page_response.html")
  res.status(200).json({
    status: "ok",
    isAuthenticated: true,
    profile: req.profile,
  });
});

// **Login Controller**
exports.login = catchAsync(async function login(req, res, next) {
  const { email, password } = req.body;
  const profile = await Profile.findOne({ email });

  if (!profile) {
    return next(new appError("No profile found with this email.", 400));
  }

  const isValidPassword = await profile.comparePassword(password);
  if (!isValidPassword) {
    return next(new appError("Invalid password.", 400));
  }

  const token = jwt.sign({ id: profile._id, email: profile.email }, secret, { expiresIn: "1h" });

  req.token = token;
  req.profile = profile;

  next();
});

// **Authenticate Request**
exports.authenticateRequest = catchAsync(async function (req, res, next) {
  if(req.session.prev)
     req.session.pre=req.session.prev+1;
  else
  req.session.prev=1;
  const token = req.session.token;

  if (!token) {
    return next(new appError("No authentication token found.", 401));
  }

  const { email } = jwt.decode(token);
  const isVerified = jwt.verify(token, secret);
  const profile = await Profile.findOne({ email });

  if (!profile) {
    return next(new appError("You need to register. User info has been deleted.", 400));
  }

  if (!isVerified) {
    return next(new appError("Token is invalid or expired. Please log in again.", 400));
  }

  if (email !== req.session.profile.email) {
    return next(new appError("Token does not belong to this session.", 400));
  }

  req.profile = profile;
  next();
});
//this middleware is required to be used only after the authenticate request
exports.isVerfied=(verify=[])=>{
  return catchAsync(async function(req,res,next){
  const profile=req.profile;
    if(verify.includes("normal")&&!profile?.verification_factor?.isVerified)
      return next(new appError('profile is not verified',400))
    if(verify.includes("email")&&!profile?.isEmailVerfied)
      return next(new appError('email is not verified',400))
    if(verify.includes("phone")&&!profile?.isPhoneNumberVerified)
      return next(new appError('phone number is not verified',400))
  return next();
})};
exports.checkRoles = (roles=[])=>{
  return catchAsync(async function (req, res, next) {
  const profile=req.profile;
  if (!roles || !Array.isArray(roles)) {
      return next(new appError("Roles must be an array", 400));
  }

  if (!profile || !profile.role) {
      return next(new appError("User role not found. Unauthorized.", 403));
  }
  if(profile.role.includes("admin"))
    req.profile.isAdmin=true;
  const hasPermission = profile.role.some(userRole => roles.includes(userRole));
  if (!hasPermission) {
      return next(new appError("You do not have permission to perform this action", 403));
  }

  next(); 
})
};
