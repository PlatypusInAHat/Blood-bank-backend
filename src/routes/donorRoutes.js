const express = require("express");
const {
    getAllDonors,
    getDonorById,
    createDonor,
    updateDonor,
    deleteDonor,
    searchDonors,
    addDonationHistory
} = require("../controllers/donorController");
const { apiKeyAuth } = require("../middleware/securityMiddleware");

const router = express.Router();

// Lấy danh sách người hiến máu (Yêu cầu API Key)
router.get("/", apiKeyAuth, getAllDonors);

// Lấy thông tin một người hiến máu theo ID
router.get("/:id", apiKeyAuth, getDonorById);

// Thêm người hiến máu mới
router.post("/", apiKeyAuth, createDonor);

// Cập nhật thông tin người hiến máu
router.put("/:id", apiKeyAuth, updateDonor);

// Xóa người hiến máu
router.delete("/:id", apiKeyAuth, deleteDonor);

// Tìm kiếm người hiến máu theo nhóm máu & địa điểm
router.get("/search", apiKeyAuth, searchDonors);

// Thêm lịch sử hiến máu
router.post("/history", apiKeyAuth, addDonationHistory);

module.exports = router;