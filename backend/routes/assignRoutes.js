const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// ASSIGN SITE TO USER (ADMIN / MANAGER)
router.put(
  "/assign-site",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    const { userId, siteId } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { assignedSite: siteId },
        { new: true }
      );

      res.json({
        message: "Site assigned successfully",
        user
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
