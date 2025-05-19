require("dotenv").config();
console.log(' MONGO_URI from .env:', process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});


// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://mywebsite.com"
];

const corsOptions = {
  origin: function(origin, callback){
    // Allow requests with no origin (like curl or Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};



app.use(cors(corsOptions));  // Apply CORS options
app.use(express.json());  // Middleware to parse JSON bodies
app.use("/api/event", require("./routes/eventRegistration"));
app.use("/api/events", require("./routes/events"));

// MongoDB Connection using the URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Importing routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));  // Event routes

// Serve static files for image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set the port: Use .env value if available or fallback to 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
