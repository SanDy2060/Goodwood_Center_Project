// backend/routes/events.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// 📌 Create new event (admin only)
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, location, price } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      price,
      createdBy: req.user._id,
      image: imageUrl
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ msg: "Error saving event", error: err.message });
  }
});

// 📌 Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching events", error: err.message });
  }
});

// 📌 Get the next upcoming event
router.get("/upcoming/next", async (req, res) => {
  try {
    const now = new Date();
    const event = await Event.findOne({ date: { $gte: now } })
      .sort({ date: 1 })
      .limit(1);
    res.json(event);
  } catch (err) {
    console.error("Failed to fetch upcoming event:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 📌 Get completed events
router.get("/completed", async (req, res) => {
  const now = new Date();
  const events = await Event.find({ date: { $lt: now } }).sort({ date: -1 });
  res.json(events);
});

// 📌 Get a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name");
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching event", error: err.message });
  }
});

// 📌 Delete an event (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// 📌 Like an event
router.post("/:id/like", authMiddleware, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ msg: "Event not found" });
  event.likes = (event.likes || 0) + 1;
  await event.save();
  res.json({ likes: event.likes });
});

// 📌 Add a comment
router.post("/:id/comments", authMiddleware, async (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    user: req.user._id,
    event: req.params.id
  });
  await comment.save();
  res.status(201).json(comment);
});

// 📌 Get comments for event
router.get("/:id/comments", async (req, res) => {
  const comments = await Comment.find({ event: req.params.id }).populate("user", "name");
  res.json(comments);
});

// 📌 Delete a comment (only by its owner)
router.delete("/comments/:id", authMiddleware, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ msg: "Comment not found" });

  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: "Not authorized to delete this comment" });
  }

  await comment.deleteOne();
  res.json({ msg: "Comment deleted" });
});

module.exports = router;
