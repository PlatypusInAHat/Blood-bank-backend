const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Đăng ký tài khoản mới
router.post("/register", register);

// Đăng nhập tài khoản
router.post("/login", login);

module.exports = router;