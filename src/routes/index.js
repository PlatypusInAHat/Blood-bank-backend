const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { syncDatabase } = require("./models"); // 🆕 Đồng bộ database khi khởi động
const routes = require("./routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Tích hợp tất cả API
app.use("/api", routes);

// Kết nối database và khởi động server
const PORT = process.env.PORT || 5000;
syncDatabase().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
});