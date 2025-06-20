const catchAsync = require('../utils/catchAsync.js');
const AppError=require("../utils/appErrors.js")
const nodemailer=require("nodemailer")

const path=require("path")
const fs=require("fs")
const transporter = nodemailer.createTransport({
  host: process.env.mailtrap_host,
  port: process.env.mailtrap_port,
  auth: {
    user: process.env.mailtrap_user,
    pass: process.env.mailtrap_pass // Replace with your Mailtrap password
  }
});
  // Your sendMail function
  exports.sendMail = catchAsync(async (req, res, next) => {
    // Check for required fields and throw an error if they are missing
    if (!req.body.to || !req.body.from || !req.body.subject || !req.body.url) {
      return next(new AppError('Missing required fields: to, from, subject, or URL', 400));
    }
  

    const filePath = path.join(__dirname,"../","../", 'public','emailView.html'); // Adjust the file path as needed
    let emailContent = fs.readFileSync(filePath, 'utf-8');
  
   
    emailContent = emailContent.replace(/%URL%/g, req.body.url);

  
    // Define the email options with the modified HTML content
    const mailOptions = {
      from: req.body.from, // Sender address
      to: req.body.to, // List of recipients
      subject: req.body.subject, // Subject line
      html: emailContent // HTML body from the file
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return next(new AppError(`Error occurred while sending email: ${error.message}`, 500));
      }
      if(req.companyVerification){
        const message=`email has been sent to ${req.body.to}`
        res.status(201).send(
          message
        );
      }
      console.log('Email sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      const {to}=req.body
      const profile=req.profile;
      const isSignup=req.isSignup
      const message=!isSignup?`Reset token has been sent to ${to}`:`to verify your email check the mail send to ${req.body.to}`
      console.log("executed the email portion")
      res.status(201).send(
        message
      );
      console.log("executed the email portion1")
      
    });

  });

  exports.sendCustomEmail = catchAsync(async (req, res, next) => {
    console.log(req.body)
    if (!req.body.to || !req.body.from || !req.body.subject || !req.body.url) {
      return next(new AppError('Missing required fields: to, from, subject, or URL', 400));
    }
    const filePath = path.join(__dirname,"../","../", 'public','customView.html'); 
    let emailContent = fs.readFileSync(filePath, 'utf-8');
    emailContent = emailContent.replace(/{{sender_email}}/g, req.body.from);
    emailContent = emailContent.replace(/{{to}}/g, req.body.to);
    emailContent = emailContent.replace(/{{email_subject}}/g, req.body.subject);
    const response=req.response
    const mailOptions = {
      from: req.body.from, 
      to: req.body.to, 
      subject: req.body.subject, 
      html: emailContent 
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return next(new AppError(`Error occurred while sending email: ${error.message}`, 500));
      }
      res.status(201).send(response);
    })
  })