require("dotenv").config();
console.log(' MONGO_URI from .env:', process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events")); //Update Server.js to add event routes

// app.use("/api/gallery", require("./routes/gallery")); //Update Server.js to add gallery routes
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT=8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


