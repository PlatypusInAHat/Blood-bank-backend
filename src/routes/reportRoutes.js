const express = require("express");
const {
    getBloodReport,
    getDonationReport,
    getBloodRequestReport,
    getDonorReport,
    getDonationTrends
} = require("../controllers/reportController");
const { apiKeyAuth } = require("../middleware/securityMiddleware");

const router = express.Router();

// 📊 Báo cáo tổng số lượng máu theo nhóm máu
router.get("/blood", apiKeyAuth, getBloodReport);

// 🏥 Báo cáo tổng số lần hiến máu theo bệnh viện
router.get("/donations", apiKeyAuth, getDonationReport);

// 🔥 Báo cáo số lượng yêu cầu máu đã xử lý & bị từ chối
router.get("/requests", apiKeyAuth, getBloodRequestReport);

// 🩸 Báo cáo số lượng người hiến máu theo nhóm máu
router.get("/donors", apiKeyAuth, getDonorReport);

// 📅 Báo cáo tình trạng hiến máu theo ngày/tháng/năm
router.get("/trends", apiKeyAuth, getDonationTrends);

module.exports = router;