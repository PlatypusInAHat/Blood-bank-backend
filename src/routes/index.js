const express = require("express");

const authRoutes = require("./authRoutes");
const donorRoutes = require("./donorRoutes");
const bloodInventoryRoutes = require("./bloodInventoryRoutes");
const bloodRequestRoutes = require("./bloodRequestRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

// Nhóm API vào một điểm truy cập duy nhất
router.use("/auth", authRoutes);
router.use("/donors", donorRoutes);
router.use("/blood", bloodInventoryRoutes);
router.use("/requests", bloodRequestRoutes);
router.use("/users", userRoutes);

module.exports = router;