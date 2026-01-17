const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true
    },
    checkInTime: {
      type: Date,
      default: Date.now
    },
    checkOutTime: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckIn", checkInSchema);
