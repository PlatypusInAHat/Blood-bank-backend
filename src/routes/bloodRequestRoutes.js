const express = require("express");
const { getAllRequests, createRequest } = require("../controllers/bloodRequestController");

const router = express.Router();

// Lấy danh sách yêu cầu máu
router.get("/", getAllRequests);

// Tạo yêu cầu máu mới
router.post("/", createRequest);

module.exports = router;