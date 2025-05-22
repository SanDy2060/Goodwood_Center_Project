const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware"); // For image uploads
const authMiddleware = require("../middleware/authMiddleware");
const { sendServiceRegistrationEmail } = require("../controllers/registerServiceController");


// 🔓 Public: Get all active services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ dayOfWeek: 1, startTime: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch services", error: err.message });
  }
});

// 🔐 Admin: Create a new service
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, dayOfWeek, startTime, endTime, maxSpots } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newService = new Service({
      name,
      description,
      dayOfWeek,
      startTime,
      endTime,
      maxSpots: maxSpots || null,
      image: imageUrl,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error("❌ Error creating service:", err);
    if (!res.headersSent) {
      res.status(500).json({ msg: "Failed to create service", error: err.message });

    }
  }
});

// 🔍 Get a single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching service", error: err.message });
  }
});


// 🔐 Admin: Update a service
router.put("/:id", adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, dayOfWeek, startTime, endTime, maxSpots, isActive } = req.body;

    const updateData = {
      name,
      description,
      dayOfWeek,
      startTime,
      endTime,
      maxSpots: maxSpots || null,
      isActive,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedService) return res.status(404).json({ msg: "Service not found" });

    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update service", error: err.message });
  }
});

// 🔐 Admin: Delete a service
router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Service not found" });
    res.json({ msg: "Service deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete service", error: err.message });
  }
});

// POST: Register for a service
router.post("/:id/register", sendServiceRegistrationEmail);



// 🔍 Get a single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching service", error: err.message });
  }
});


module.exports = router;
