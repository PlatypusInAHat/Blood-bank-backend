const { User } = require("../models");

// Lấy danh sách tất cả user
exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Xóa user (chỉ admin)
exports.deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.status(200).json({ message: "User đã bị xóa" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};