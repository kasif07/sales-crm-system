const express = require("express");
const CheckIn = require("../models/CheckIn");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Distance function (same logic)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (v) => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// CHECK-IN
router.post("/check-in", protect, async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const user = await User.findById(req.user.id).populate("assignedSite");
    if (!user.assignedSite) {
      return res.status(400).json({ message: "No site assigned" });
    }

    const site = user.assignedSite;

    const distance = getDistance(
      latitude,
      longitude,
      site.latitude,
      site.longitude
    );

    if (distance > site.radius) {
      return res.status(400).json({ message: "You are outside the site" });
    }

    const checkIn = await CheckIn.create({
      user: user._id,
      site: site._id
    });

    res.json({
      message: "Check-in successful",
      checkIn
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


// CHECK-OUT
router.post("/check-out", protect, async (req, res) => {
  try {
    const checkIn = await CheckIn.findOne({
      user: req.user.id,
      checkOutTime: null
    });

    if (!checkIn) {
      return res.status(400).json({ message: "No active check-in found" });
    }

    checkIn.checkOutTime = new Date();
    await checkIn.save();

    res.json({
      message: "Check-out successful",
      checkIn
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

