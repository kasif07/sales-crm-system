const express = require("express");
const Site = require("../models/Site");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Distance calculate function (Haversine)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // meters
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

// CHECK LOCATION API
router.post("/check", protect, async (req, res) => {
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

    const inside = distance <= site.radius;

    res.json({
      site: site.name,
      distance: Math.round(distance),
      radius: site.radius,
      insideSite: inside
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
