const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { limiter, securityHeaders, ipBlocker, apiKeyAuth } = require("./middleware/securityMiddleware");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const bloodInventoryRoutes = require("./routes/bloodInventoryRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const bloodTestRoutes = require("./routes/bloodTestRoutes"); // 🩸 Thêm route xét nghiệm máu

const app = express();

// 🛡️ Middleware bảo mật
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(securityHeaders);
app.use(limiter);
app.use(ipBlocker);
app.use(apiKeyAuth);

// 📜 Cấu hình Swagger API Documentation
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Blood Bank Management API",
            version: "1.0.0",
            description: "API Documentation for Blood Bank Management System"
        }
    },
    apis: ["./routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 📌 Tích hợp tất cả API vào hệ thống
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/blood", bloodInventoryRoutes);
app.use("/api/requests", bloodRequestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/tests", bloodTestRoutes); // 🩸 Tích hợp API xét nghiệm máu

// 🛠️ Middleware xử lý lỗi
app.use(errorHandler);

// 🛠️ Xử lý route không tồn tại
app.use((req, res) => {
    res.status(404).json({ success: false, message: "API endpoint không tồn tại!" });
});

module.exports = app;