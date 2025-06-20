const Student=require("../../model/RegisterStudent")
const verifiaction_factor=require("../../model/verifiaction_factor")
const catchAsync=require("../../utils/catchAsync")
const {createResetTokenPassword,compareResetToken}=require("../../utils/validateProfile")
const appError=require("../../utils/appErrors")
const jwt=require("jsonwebtoken")
const secret=process.env.SESSION_KEY
exports.signup=catchAsync(async function(req,res,next){
  const {verification_factor}=req.params;
  if(verification_factor)
    return next();
   const {StudentName,email,confirmPassword,password,address,phone}=req.body;
   const token=jwt.sign({email,StudentName},secret);
   let student=await Student.findOne({email})
   if(!student)
   student=await Student.create({
       studentName:StudentName,
       email,
       password,
       confirmPassword,
       address,
       phone
    })
    // i have stored the token in session of the user and also do be sending as the header respoonse
    res.setHeader('Authorization', `Bearer ${token}`);
    req.session.token=token;
    // now prepare the req object for the next middleware that will be used to generate the token and will be then verified using the email
   req.isSignup=true;
   req.session.userId=student._id;
   req.profile=student;
   next();
})

// now this middleware will be responsible for the token genration
//this is the middleware that gonna be used in the verification of email or phone numbers
exports.tokenGenerator=catchAsync(async function(req,res,next){
    const {email}=req.body  
    const userId=req.session.userId
    const profile=await Student.findOne({_id:userId});
    if(!profile)
      return next(new appError("no profile with the email was prior registered ",400))
    const {resetToken:tokenString}=await createResetTokenPassword({email})
    const payload={
      email:profile.email,
      token:tokenString
    }
    const token = await jwt.sign({...payload,id:req.session.userId}, secret, { expiresIn: '1h' });
    //disabling all the verification objects previously issued
    await verifiaction_factor.deleteMany({profileID:req.session.userId});
    // creating a new verification row
    const verification_obj=await verifiaction_factor.create({
      profileID:req.session.userId,
      value:token,
    })
    console.log(verification_obj)
    //extracting the parent url route and making it ready to be send for the verification process
    const root = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const parentRoute=(root.split('/').slice(0,root.split('/').length-1).join('/'))
    let redirectUri
    if(req.isSignup)
      redirectUri=`${parentRoute}/signup/${verification_obj.id}`
    else
      redirectUri=`${parentRoute}/verifyProfile/${verification_obj.id}`
  
    //now defining the sender,subject and its reciever for the verification
    console.log(profile)
    req.body.to=email;
    req.body.from="prakharvision@gmail.com"
    req.body.subject=`to verify your email or reset password follow this link ${redirectUri}`
    req.body.url=redirectUri
    next()
  })
  //this will be used when we want to check the token received from the email or via otp is correct or not
   //now this controller is to verify wether the token is correct and this will be caught when user will click
  //on the sended url in there mail 
  exports.authenticateVerification=catchAsync(async function(req,res,next){
    const {verification_factor}=req.params;
    const verification_obj=await verifiaction_factor.findOne({
      _id:verification_factor
    })
    if(!verification_obj)
      return next(new appError("verification time has either been expired or new verification token was issued",400))
    let profile=await Student.findOne({_id:verification_obj.profileID})
    if(!verification_obj.isValid||verification_obj.isUsed)
      return next(new appError(`verification link  ${verification_obj.isUsed?"has been used":"has been expired or invalidated"}`,400))
    if(!profile)
      return next(new appError("profile associated with this verification has been deleted from the database"))
    //check if the token has not been tampered it is somewhat not useful yet i did it anyways as the token was comming from the database
    if(! jwt.verify(verification_obj.value,secret))
      return next(new appError("invalid jwt token",403))
    const {email,token}=jwt.decode(verification_obj.value,secret)
    console.log(token)
    if(! await compareResetToken({email,providedToken:token}))
      return next(new appError("token is invalid",403))
    
    profile = await Student.findByIdAndUpdate(
      profile._id,
      { $set: { "verification_details.isVerified": true } },
      { new: true }
    );
    await verifiaction_factor.findOneAndUpdate({profileID:profile._id},{$set:{isValid:false,isUsed:true}})
    // ------------------------------------------------------------------------------------------
    // making the request ready for the following middleware this is in case of the verification of the email
    console.log(profile)
    req.profile=profile;
    const {_id}=profile
    req.token=jwt.sign({ email, id:_id }, secret);
    next()
  })

  exports.issueAuthenticationToken=catchAsync(async(req,res,next)=>{
    req.session.token=req.token;
    req.session.isAuthenticated=true;
    req.session.profile=req.profile
    req.session.save();
    res.status(200).json({
      status:"ok",
      isAuthenticated:true,
      profile:req.profile
    })
  })

  exports.login =catchAsync(async function login(req,res,next){
     const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
          return next(new appError("no student with this profile was registered or signed in",400))
        }
        const isValidPassword=await student.comparePassword(password);
        if(!isValidPassword)
          return next(new appError("password is invalid ",400))
         const token = await jwt.sign(
              { id: student._id, email: student.email },
              secret,
              { expiresIn: "1h" }
            );
    req.token=token;
    req.profile=student;
    next()
  })

  exports.authenticateRequest=catchAsync(async function(req,res,next){
    const token=req.session.token;
    const {email}=await jwt.decode(token);
    const isVerified=await jwt.verify(token,secret);
    const profile=await Student.findOne({email})
    if(!profile)
      return next(new appError("you need to register,user s info has been deleted from the user"),400);
    if(!isVerified)
      return next(new appError("token is either invalid or has been expired,login again"),400);
    if(email!=req.session.profile.email)
      return next(new appError("token was issued by the different person,"),400);
    req.profile=profile;
    next()

  })

