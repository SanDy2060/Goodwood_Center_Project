const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");
const { sendServiceRegistrationEmail } = require("../controllers/registerServiceController");

// 🔓 Get all active services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ dayOfWeek: 1, startTime: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch services", error: err.message });
  }
});

// 🔐 Create a new service
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, dayOfWeek, startTime, endTime, maxSpots, type, hallSlots } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newService = new Service({
      name,
      description,
      dayOfWeek,
      startTime,
      endTime,
      maxSpots: maxSpots || null,
      type: type || "regular",
      hallSlots: type === "hall" ? JSON.parse(hallSlots || "[]") : [],
      image: imageUrl,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error("❌ Error creating service:", err);
    res.status(500).json({ msg: "Failed to create service", error: err.message });
  }
});

// 🔐 Book a hall slot
router.post("/:id/book-slot", async (req, res) => {
  const { slotIndex, name, email, message } = req.body;

  try {
    const service = await Service.findById(req.params.id);
    if (!service || service.type !== "hall") {
      return res.status(404).json({ msg: "Hall not found" });
    }

    const slot = service.hallSlots[slotIndex];
    if (!slot || slot.isBooked) {
      return res.status(400).json({ msg: "Slot already booked or invalid" });
    }

    // Save booking
    service.hallSlots[slotIndex].isBooked = true;
    service.hallSlots[slotIndex].bookedBy = { name, email, message };
    await service.save();

    // Email Confirmation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Hall Booking Confirmation – ${service.name}`,
      html: `
        <p>Hi ${name},</p>
        <p>Your hall booking is confirmed for:</p>
        <ul>
          <li><strong>Date:</strong> ${slot.date}</li>
          <li><strong>Time:</strong> ${slot.startTime} – ${slot.endTime}</li>
          <li><strong>Location:</strong> ${service.name}</li>
        </ul>
        <p>Thank you,<br>Goodwood Community Centre</p>
      `,
    });

    res.json({ msg: "Booking confirmed!" });
  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(500).json({ msg: "Booking failed", error: err.message });
  }
});

// 🔍 Get a single service
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching service", error: err.message });
  }
});

router.patch('/:id/feature', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    service.featured = !service.featured; // <-- toggle the value
    await service.save();

    res.status(200).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 🔐 Update a service
router.put("/:id", adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, dayOfWeek, startTime, endTime, maxSpots, isActive, type, hallSlots } = req.body;

    const updateData = {
      name,
      description,
      dayOfWeek,
      startTime,
      endTime,
      maxSpots: maxSpots || null,
      isActive,
      type,
      hallSlots: type === "hall" ? JSON.parse(hallSlots || "[]") : [],
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

// 🔐 Delete a service
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Service not found" });
    res.json({ msg: "Service deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete service", error: err.message });
  }
});

// 🔓 Register for regular service
router.post("/:id/register", sendServiceRegistrationEmail);

module.exports = router;
