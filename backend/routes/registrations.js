const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", auth, adminOnly, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load registrations" });
  }
});

module.exports = router;
