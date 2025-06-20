const express = require("express");
const {
  getNotifications,
} = require("../controller/notification/notificationController");

const router = express.Router();
// notifications
router.get("/notifications", getNotifications);

module.exports = router;
