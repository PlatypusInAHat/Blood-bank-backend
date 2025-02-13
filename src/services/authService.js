const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Đăng ký tài khoản mới
const register = async({ name, email, password, role }) => {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) throw new Error("Email đã tồn tại!");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    return newUser;
};

// Đăng nhập
const login = async({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Email không tồn tại!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Sai mật khẩu!");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return { user, token };
};

// Lấy thông tin người dùng theo ID
const getUserById = async(id) => {
    return await User.findByPk(id, { attributes: { exclude: ["password"] } });
};

module.exports = { register, login, getUserById };