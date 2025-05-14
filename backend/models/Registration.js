const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventTitle: String,
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Registration", registrationSchema);
