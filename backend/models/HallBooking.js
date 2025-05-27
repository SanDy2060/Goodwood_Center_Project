const mongoose = require("mongoose");

const hallBookingSchema = new mongoose.Schema({
  hall: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  date: { type: String, required: true }, // Format: "2025-06-01"
  startTime: { type: String, required: true }, // Format: "10:00"
  endTime: { type: String, required: true },   // Format: "12:00"
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HallBooking", hallBookingSchema);
