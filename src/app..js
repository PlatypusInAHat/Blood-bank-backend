const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

// Import middleware
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const bloodInventoryRoutes = require("./routes/bloodInventoryRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// 📌 Middleware cơ bản
app.use(express.json()); // Hỗ trợ JSON request body
app.use(cors()); // Hỗ trợ CORS
app.use(helmet()); // Bảo vệ API bằng cách thiết lập HTTP headers an toàn
app.use(morgan("dev")); // Ghi log request HTTP

// 📌 Định tuyến API
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/blood", bloodInventoryRoutes);
app.use("/api/requests", bloodRequestRoutes);
app.use("/api/users", userRoutes);

// 📌 Middleware xử lý lỗi tập trung
app.use(errorHandler);

module.exports = app;