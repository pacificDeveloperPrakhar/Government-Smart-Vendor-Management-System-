// notificationController.js

const Notification = require("../../model/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 }); // Most recent first
    res.status(200).json({ notifications });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getNotifications,
};
