const express = require("express");
const router = express.Router();
const { contactOwner } = require("../controller/orders/ToolsSell");

// conatct to the comanpnay
router.post("/send-email", contactOwner);

module.exports = router;
