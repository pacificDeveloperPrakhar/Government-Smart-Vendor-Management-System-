//  notfication functions
const Notification = require("../../model/Notification");

const saveNotification = async (type, message) => {
  try {
    const notification = new Notification({
      type,
      message,
    });
    await notification.save();
    console.log("notification saved");
  } catch (error) {
    console.error("Error saving notification:", error.message);
  }
};

module.exports = { saveNotification };
