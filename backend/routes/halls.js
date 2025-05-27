const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const controller = require("../controllers/hallController");

// Admin: create hall
router.post("/", auth, admin, upload.single("image"), controller.createHall);

// Public: get all halls
router.get("/", controller.getHalls);

// Public: get one hall
router.get("/:id", controller.getHallById);

// Public: book hall
router.post("/:id/book", controller.bookHallSlot);

module.exports = router;
