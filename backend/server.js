const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const testProtectedRoutes = require("./routes/testProtected");
const adminRoutes = require("./routes/adminRoute");
const siteRoutes = require("./routes/siteRoutes");
const assignRoutes = require("./routes/assignRoutes");
const geoRoutes = require("./routes/geoRoutes");
const checkInRoutes = require("./routes/checkInRoutes");







const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/test", testProtectedRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/sites", siteRoutes);

app.use("/api/assign", assignRoutes);

app.use("/api/geo", geoRoutes);

app.use("/api/checkin", checkInRoutes);









// DB connect
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Sales CRM Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
