const express = require("express");
const {
    getAllBlood,
    updateBloodStock,
    removeExpiredBlood,
    checkBloodAvailability,
    deductBloodStock
} = require("../controllers/bloodInventoryController");

const router = express.Router();

// Lấy danh sách kho máu
router.get("/", getAllBlood);

// Cập nhật số lượng máu trong kho
router.put("/", updateBloodStock);

// Kiểm tra máu trước khi duyệt yêu cầu
router.post("/check-availability", checkBloodAvailability);

// Xuất kho máu khi duyệt yêu cầu
router.post("/deduct", deductBloodStock);

module.exports = router;