const Hall = require("../models/Hall");
const HallBooking = require("../models/HallBooking");
const nodemailer = require("nodemailer");

// ✅ Create a new hall
exports.createHall = async (req, res) => {
  try {
    const { name, location, description, openingTime, closingTime } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const hall = new Hall({
      name,
      location,
      description,
      openingTime,
      closingTime,
      image,
    });

    await hall.save();
    res.status(201).json(hall);
  } catch (err) {
    console.error("Error creating hall:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get all active halls
exports.getHalls = async (req, res) => {
  try {
    const halls = await Hall.find({ isActive: true }).sort({ name: 1 });
    res.json(halls);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch halls", error: err.message });
  }
};

// ✅ Get one hall by ID
exports.getHallById = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ msg: "Hall not found" });
    res.json(hall);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching hall", error: err.message });
  }
};

// ✅ Delete a hall (admin only)
exports.deleteHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    if (!hall) return res.status(404).json({ msg: "Hall not found" });
    res.json({ msg: "Hall deleted successfully" });
  } catch (err) {
    console.error("Delete hall error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Book a hall slot with 1hr minimum and no overlap
exports.bookHallSlot = async (req, res) => {
  const { userName, userEmail, date, startTime, endTime, message } = req.body;

  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ msg: "Hall not found" });

    // Check 1-hour minimum
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);
    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    if (end - start < 60) {
      return res.status(400).json({ msg: "Minimum booking is 1 hour." });
    }

    // Check for overlapping bookings
    const existing = await HallBooking.find({
      hall: hall._id,
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (existing.length > 0) {
      return res.status(400).json({ msg: "Selected time overlaps with existing booking." });
    }

    // Save the booking
    const booking = new HallBooking({
      hall: hall._id,
      userName,
      userEmail,
      date,
      startTime,
      endTime,
      message
    });
    await booking.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
      <p>Hi ${userName},</p>
      <p>Your hall booking is confirmed:</p>
      <ul>
        <li><strong>Hall:</strong> ${hall.name}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${startTime} – ${endTime}</li>
      </ul>
      <p>– Goodwood Community Centre</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Hall Booking Confirmation – ${hall.name}`,
      html: emailHtml,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Hall Booking – ${hall.name}`,
      html: `<p>New booking by <strong>${userName}</strong> on ${date} from ${startTime} to ${endTime}.</p>`,
    });

    res.status(200).json({ msg: "Booking confirmed" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
