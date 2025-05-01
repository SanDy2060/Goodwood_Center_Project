const mongoose = require("mongoose");

// Define the Event schema
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Title of the event
    description: { type: String, required: true }, // Description of the event
    date: { type: Date, required: true }, // Date of the event
    location: { type: String, required: true }, // Location of the event
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who created the event
    image: { type: String, default: null }, // The image URL (new field)
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model("Event", eventSchema);
