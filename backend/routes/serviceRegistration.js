const express = require("express");
const router = express.Router();
const { sendServiceRegistrationEmail } = require("../controllers/registerServiceController");

router.post("/register", sendServiceRegistrationEmail);

module.exports = router;
