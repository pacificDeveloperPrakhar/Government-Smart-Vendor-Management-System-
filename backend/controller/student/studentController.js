const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../../model/RegisterStudent");
const Notification = require("../../model/Notification");
const transport = require("../../config/mail");
const catchAsync=require("../../utils/catchAsync")
const multer = require("multer");
const { saveNotification } = require("../notification/NotificationsFunction");

require("dotenv").config();

// Register a new student
const registerStudent = async (req, res) => {
  try {
    const { password, confirmPassword, ...studentData } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const newStudent = new Student({ ...studentData, password,confirmPassword});

    // Save student to database
  
    await newStudent.save();
    console.timeEnd("Database Save");

    // Generate a JWT token
    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });

    // Send welcome email to the student
    const studentMailOptions = {
      from: "ajitwaman354@gmail.com",
      to: req.body.email,
      subject: "Welcome to Our Platform!",
      text: `Dear ${newStudent.studentName},\n\nThank you for registering as a student. We're excited to have you on board.\n\nBest regards,\nYour School`,
    };

    transport.sendMail(studentMailOptions).catch((emailError) => {
      console.error("Error sending email:", emailError);
    });

    // Send notification email to the owner/admin
    const newStudentRegiter = {
      from: req.body.email,
      to: "ajitwaman354@gmail.com",
      subject: "New Student Registration Notification",
      text: `A new student has registered:\n\nName: ${
        newStudent.studentName
      }\nEmail: ${newStudent.email}\nContact: ${
        studentData.phone || "N/A"
      }\n\nPlease review their details.`,
    };

    transport.sendMail(newStudentRegiter).catch((emailError) => {
      console.error("Error sending email:", emailError);
    });

    // Save notification for the new student registration
    await saveNotification(
      "student",
      `A new student has registered: ${newStudent.studentName}`
    );

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Student registered successfully!" });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(400).json({ error: e.message });
  }
};

// Login a student
const loginStudent = catchAsync(async (req, res) => {
 
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
     req.session.token=token;
     req.session.save()
    // Login successful
    res.status(200).json({ message: "Login successful", token });
  
})
//

// Apply to job
const studentApplyJob = async (req, res) => {
  const { name, email, phone, coverLetter, company, position } = req.body;
  const resumeFile = req.file;

  if (!resumeFile) {
    return res
      .status(400)
      .json({ success: false, message: "Resume file is required." });
  }

  const newStudentJobApplications = {
    from: email,
    to: "ajitwaman354@gmail.com", // owner email id
    subject: "New Job Application Notification",
    text: `A new student has applied for a job:\n\nName: ${name}\nEmail: ${email}\nContact: ${phone}\nPosition Applied: ${position}\nCompany: ${company}\n\nCover Letter:\n${coverLetter}\n\nPlease review their application.`,
    attachments: [
      {
        filename: resumeFile.originalname,
        path: resumeFile.path,
      },
    ],
  };

  try {
    await transport.sendMail(newStudentJobApplications);
    res.status(200).json({ success: true, message: "Mail successfully sent." });
  } catch (emailError) {
    console.error("Error sending email:", emailError);
    res
      .status(500)
      .json({ success: false, message: "Failed to send the email." });
  }
};

// Logout a student
const logout=catchAsync(async function(req,res,next){
  const profile=req.session.profile
req.session.destroy()
res.status(201).json({
  status:"deleted",
  message:"successfully removed the currently sessioned profile",
  profile
})
})

module.exports = {
  registerStudent,
  loginStudent,
  studentApplyJob,
  logout,
};
