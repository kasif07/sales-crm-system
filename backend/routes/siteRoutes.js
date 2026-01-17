const express = require("express");
const Site = require("../models/Site");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// ✅ CREATE SITE (ADMIN ONLY)
router.post(
  "/",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const site = await Site.create(req.body);
      res.status(201).json(site);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ✅ GET ALL SITES (LOGIN REQUIRED)
router.get(
  "/",
  protect,
  async (req, res) => {
    const sites = await Site.find();
    res.json(sites);
  }
);

module.exports = router;
