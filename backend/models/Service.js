const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  dayOfWeek: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  maxSpots: { type: Number, default: null },
  image: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  registrations: [
    {
      name: String,
      email: String,
      message: String,
      registeredAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["regular", "hall"],
    default: "regular"
  },
});
  
module.exports = mongoose.model("Service", serviceSchema);
