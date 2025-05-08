// backend/routes/events.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Protected route to create a new event with image upload
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, location, price } = req.body;

    // Ensure required fields are provided
    if (!title || !description || !date || !location) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    // Image URL will be saved if the image is uploaded
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      price,
      createdBy: req.user._id,
      image: imageUrl // Save the image URL in the database
    });

    await newEvent.save();
    res.status(201).json(newEvent); // Return the created event with the image URL
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ msg: "Error saving event", error: err.message });
  }
});

// Public route for fetching all events (no authentication middleware)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching events", error: err.message });
  }
});

// Route to get a single event by ID (for event details)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name");

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching event", error: err.message });
  }
});

// Protected route to delete an event
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
