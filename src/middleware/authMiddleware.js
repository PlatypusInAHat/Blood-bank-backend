const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware kiểm tra JWT token
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Không có token, truy cập bị từ chối!" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token không hợp lệ!" });
    }
};

module.exports = authenticate;