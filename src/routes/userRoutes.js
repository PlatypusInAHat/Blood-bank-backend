const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/userController");

const router = express.Router();

// Lấy danh sách tất cả user (chỉ admin)
router.get("/", getAllUsers);

// Xóa user (chỉ admin)
router.delete("/:id", deleteUser);

module.exports = router;