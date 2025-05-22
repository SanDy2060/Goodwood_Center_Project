const express = require("express");
const router = express.Router();
const { sendRegistrationEmail } = require("../controllers/registerEventController"); // Make sure controller file exists

router.post("/register", sendRegistrationEmail); // Handles POST /api/event/register

module.exports = router;
