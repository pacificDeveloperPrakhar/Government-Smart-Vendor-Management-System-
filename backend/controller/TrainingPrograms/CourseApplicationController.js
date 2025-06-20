const transport = require("../../config/mail");
const { saveNotification } = require("../notification/NotificationsFunction");
const courseApplicationSchema = require("../../model/CourseApplication");

const allSubmittedApplications = async (req, res) => {
  try {
    const applications = await courseApplicationSchema.find({});
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//  coures application
const submitCourseApplication = async (req, res) => {
  try {
    const { courseName, name, email, phone, message } = req.body;
    console.log(courseName);
    if (!courseName || !name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Email content for the owner
    const couresApplications = {
      from: email, // Sender's email
      to: "ajitwaman354@gmail.com", // Replace with the owner's email
      subject: `New Course Application for Course Name is : ${courseName}`,
      text: `
        A new course application has been submitted.
        
        Details:
        - Name: ${name}
        - Email: ${email}
        - Phone: ${phone}
        - Message: ${message || "No message provided"}

        Please review this application.
      `,
    };

    // Send email
    transport.sendMail(couresApplications).catch((emailError) => {
      console.error("Error sending email:", emailError);
    });

    // Notification
    await saveNotification(
      "student",
      `A new course application has been submitted ${name}`
    );

    // save in database
    const newCourseApplication = new courseApplicationSchema({
      courseName,
      name,
      email,
      phone,
      message,
    });
    await newCourseApplication.save();

    // response
    res.status(200).json({
      success: true,
      message:
        "Application submitted successfully. The owner has been notified.",
    });
  } catch (error) {
    console.error("Error submitting application:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application" });
  }
};

module.exports = { submitCourseApplication, allSubmittedApplications };
