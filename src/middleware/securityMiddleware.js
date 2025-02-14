const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// 1️⃣ Bảo vệ API với Rate Limiting (Giới hạn số lượng request)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // Mỗi IP chỉ được gửi tối đa 100 request trong 15 phút
    message: "Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau!",
    headers: true
});

// 2️⃣ Bảo vệ API với Helmet (Chặn các cuộc tấn công XSS, Clickjacking, v.v.)
const securityHeaders = helmet();

// 3️⃣ Danh sách các IP bị chặn (Có thể cập nhật từ database)
const blockedIPs = ["192.168.1.1", "123.45.67.89"]; // Ví dụ: Các IP xấu bị block

const ipBlocker = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    if (blockedIPs.includes(clientIP)) {
        return res.status(403).json({ message: "IP của bạn bị chặn do hành vi đáng ngờ!" });
    }
    next();
};

// 4️⃣ Middleware kiểm tra API key (Chỉ cho phép truy cập nếu có API Key hợp lệ)
const apiKeyAuth = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: "API Key không hợp lệ!" });
    }
    next();
};

module.exports = { limiter, securityHeaders, ipBlocker, apiKeyAuth };