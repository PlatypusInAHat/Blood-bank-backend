const express = require("express");
const dotenv = require("dotenv");
const { syncDatabase } = require("./src/models"); // 🆕 Đảm bảo database đồng bộ trước khi server chạy

dotenv.config();
const app = require("./src/app"); // Import `app.js` đã cấu hình API

const PORT = process.env.PORT || 5000;

// Kết nối database & khởi động server
syncDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("❌ Lỗi khi khởi động server:", error);
});