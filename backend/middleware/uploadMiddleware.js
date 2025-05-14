const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Define the upload folder path
const uploadFolder = path.join(__dirname, "../uploads");

// Check if the uploads folder exists, and create it if it doesn't
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // Save files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

module.exports = upload;
