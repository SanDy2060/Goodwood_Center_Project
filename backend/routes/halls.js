const express = require("express");
const router = express.Router();
const controller = require("../controllers/hallController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// 📌 Create a new hall (admin only)
router.post("/", auth, admin, upload.single("image"), controller.createHall);

// 📌 Get all halls (public)
router.get("/", controller.getHalls);

// 📌 Get a specific hall by ID (public)
router.get("/:id", controller.getHallById);

// 📌 Delete a hall by ID (admin only)
router.delete("/:id", auth, admin, controller.deleteHall);

router.post("/:id/book", controller.bookHallSlot);

module.exports = router;
