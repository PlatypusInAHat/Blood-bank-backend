const express = require("express");
const { getAllDonors, getDonorById, createDonor, updateDonor, deleteDonor } = require("../controllers/donorController");

const router = express.Router();

// Lấy danh sách người hiến máu
router.get("/", getAllDonors);

// Lấy một người hiến máu theo ID
router.get("/:id", getDonorById);

// Thêm người hiến máu
router.post("/", createDonor);

// Cập nhật thông tin người hiến máu
router.put("/:id", updateDonor);

// Xóa người hiến máu
router.delete("/:id", deleteDonor);

module.exports = router;