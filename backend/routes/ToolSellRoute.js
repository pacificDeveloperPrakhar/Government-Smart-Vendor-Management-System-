const express = require("express");
const router = express.Router();
const {
  ToolsSellPurchaseNotification,
  contactOwner,
} = require("../controller/orders/ToolsSell");

// tools sell purchase notification
router.post("/tools-sell-purchase-notification", ToolsSellPurchaseNotification);

// conatct to the comanpnay
router.post("/send-email", contactOwner);

module.exports = router;
