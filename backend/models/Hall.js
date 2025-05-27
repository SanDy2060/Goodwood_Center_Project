const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  image: { type: String, default: "" },
  openingTime: { type: String, required: true },  
  closingTime: { type: String, required: true },  
  price: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Hall", hallSchema);
