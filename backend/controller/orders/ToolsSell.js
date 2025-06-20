const transport = require("../../config/mail");
const orderSchema = require("../../model/orderTools"); // order model
const { saveNotification } = require("../notification/NotificationsFunction");
const contactResponseSchema = require("../../model/ContactResponses"); // contactResponseSchema

// Getting all orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderSchema.find({});
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Getting all contact responses
const allContactResponses = async (req, res) => {
  try {
    const contactResponses = await contactResponseSchema.find({});
    res.json(contactResponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Tool sell purchase notification to owner
const ToolsSellPurchaseNotification = async (req, res) => {
  const { fullName, email, phone, address, quantity, notes } = req.body;
  try {
    const newToolPurchaseNotification = {
      from: req.body.email,
      to: "ajitwaman354@gmail.com", // Replace with the recipient's email
      subject: "New Tool Purchase Notification",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #007bff;">New Tool Purchase Notification</h2>
          <p>A user has purchased tools. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Address:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${address}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Quantity:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${
                quantity || 1
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Notes:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${notes}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Please process the order promptly.</p>
          <p style="color: #555;">This is an automated email. Please do not reply.</p>
        </div>
      `,
    };

    transport.sendMail(newToolPurchaseNotification).catch((emailError) => {
      console.error("Error sending email:", emailError);
    });

    // Save in database
    const newOrder = new orderSchema({
      fullName,
      email,
      phone,
      address,
      quantity,
      notes,
    });
    await newOrder.save();

    // Save notification
    await saveNotification("admin", "New Tool Purchase Notification");

    res.status(200).json({ success: true, message: "Mail sent successfully!" });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(400).json({ error: e.message });
  }
};

// Contact owner
const contactOwner = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailtoOwner = {
      from: req.body.email,
      to: "ajitwaman354@gmail.com", // Replace with the recipient's email
      subject: req.body.subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #007bff; text-align: center;">New Message Notification</h2>
          <p style="font-size: 16px;">You have received a new message. Below are the details:</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p style="margin-top: 20px; font-size: 14px; color: #555;">This is an automated email. Please do not reply.</p>
        </div>
      `,
    };

    transport.sendMail(mailtoOwner).catch((emailError) => {
      console.error("Error sending email:", emailError);
    });

    // Save in database
    const newContactResponse = new contactResponseSchema({
      name,
      email,
      subject,
      message,
    });
    await newContactResponse.save();

    // Save notification
    await saveNotification("admin", "New Contact Response Notification");

    res.status(200).json({ success: true, message: "Mail sent successfully!" });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  ToolsSellPurchaseNotification,
  contactOwner,
  allOrders,
  allContactResponses,
};
