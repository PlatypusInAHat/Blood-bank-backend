const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Đăng ký tài khoản mới
exports.register = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Kiểm tra email đã tồn tại
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: "Email đã tồn tại" });

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Đăng nhập
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra user tồn tại
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Email không tồn tại" });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

        // Tạo token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};