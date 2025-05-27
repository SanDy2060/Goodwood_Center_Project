const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  image: { type: String, default: "" },
  openingTime: { type: String, required: true },  // Format: "09:00"
  closingTime: { type: String, required: true },  // Format: "18:00"
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Hall", hallSchema);
