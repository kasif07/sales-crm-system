const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    radius: {
      type: Number, // meters
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", siteSchema);
