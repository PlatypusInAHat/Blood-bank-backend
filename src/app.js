const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const bloodInventoryRoutes = require("./routes/bloodInventoryRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Swagger API Documentation
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Blood Bank API",
            version: "1.0.0",
            description: "API documentation for Blood Bank Management System"
        }
    },
    apis: ["./src/routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/blood", bloodInventoryRoutes);
app.use("/api/requests", bloodRequestRoutes);
app.use("/api/users", userRoutes);

// Middleware xử lý lỗi
app.use(errorHandler);

module.exports = app;