const express = require("express");
const { sequelize } = require("./src/models"); // Import Sequelize để kết nối DB
const dotenv = require("dotenv");

dotenv.config();
const app = require("./src/app"); // Import app từ `app.js`

const PORT = process.env.PORT || 5000;

// Kết nối PostgreSQL & đồng bộ models
sequelize.sync({ alter: true })
    .then(() => console.log("🟢 Database đã được đồng bộ!"))
    .catch(err => console.error("🔴 Lỗi đồng bộ database:", err));

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});