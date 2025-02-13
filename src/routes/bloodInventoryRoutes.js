const express = require("express");
const { getAllBlood, updateBloodStock } = require("../controllers/bloodInventoryController");

const router = express.Router();

// Lấy danh sách kho máu
router.get("/", getAllBlood);

// Cập nhật số lượng máu
router.put("/", updateBloodStock);

module.exports = router;