const authService = require("../services/authService");

// Đăng ký tài khoản mới
exports.register = async(req, res) => {
    try {
        const newUser = await authService.register(req.body);
        res.status(201).json({ success: true, message: "Đăng ký thành công", user: newUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Đăng nhập
exports.login = async(req, res) => {
    try {
        const { user, token } = await authService.login(req.body);
        res.status(200).json({ success: true, message: "Đăng nhập thành công", token, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Lấy thông tin người dùng hiện tại (từ JWT token)
exports.getCurrentUser = async(req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};