const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware"); 

// Protected route with authMiddleware and adminMiddleware
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, date, location } = req.body;

  const newEvent = new Event({ 
    title, 
    description, 
    date, 
    location, 
    createdBy: req.user._id 
  });

  await newEvent.save();
  res.json(newEvent);
});

// Public route
router.get("/", async (req, res) => {
  const events = await Event.find().populate("createdBy", "name");
  res.json(events);
});

module.exports = router;
