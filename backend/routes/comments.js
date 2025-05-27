const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");

// 📌 Delete a comment (only by the owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    // Only the user who created the comment can delete it
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ msg: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
