const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false, // Tắt log SQL để tối ưu hiệu suất
        define: {
            freezeTableName: true, // Ngăn Sequelize tự động đổi tên bảng thành số nhiều
            timestamps: true, // Tự động thêm createdAt và updatedAt vào tất cả các bảng
        },
    }
);

// Load Models
const User = require("./User")(sequelize);
const Donor = require("./Donor")(sequelize);
const BloodInventory = require("./BloodInventory")(sequelize);
const BloodRequest = require("./BloodRequest")(sequelize);
const BloodTest = require("./BloodTest")(sequelize); // 🩸 Thêm model BloodTest

// 📌 Thiết lập quan hệ giữa các bảng

// 1️⃣ User ↔ BloodRequest (Một user có thể tạo nhiều yêu cầu máu)
User.hasMany(BloodRequest, { foreignKey: "userId", onDelete: "CASCADE" });
BloodRequest.belongsTo(User, { foreignKey: "userId" });

// 2️⃣ Donor ↔ BloodRequest (Một người hiến máu có thể hiến nhiều lần)
Donor.hasMany(BloodRequest, { foreignKey: "donorId", onDelete: "CASCADE" });
BloodRequest.belongsTo(Donor, { foreignKey: "donorId" });

// 3️⃣ Donor ↔ BloodTest (Mỗi người hiến máu có thể có nhiều xét nghiệm máu)
Donor.hasMany(BloodTest, { foreignKey: "donorId", onDelete: "CASCADE" });
BloodTest.belongsTo(Donor, { foreignKey: "donorId" });

// 4️⃣ BloodRequest ↔ BloodInventory (Mỗi yêu cầu máu liên kết với kho máu)
BloodInventory.hasMany(BloodRequest, { foreignKey: "bloodType", sourceKey: "blood_type", onDelete: "CASCADE" });
BloodRequest.belongsTo(BloodInventory, { foreignKey: "bloodType", targetKey: "blood_type" });

// 🔄 Đồng bộ database
const syncDatabase = async() => {
    try {
        await sequelize.sync({ alter: true }); // Tự động cập nhật database khi có thay đổi
        console.log("✅ Database đã được đồng bộ!");
    } catch (error) {
        console.error("❌ Lỗi đồng bộ database:", error);
    }
};

module.exports = { sequelize, User, Donor, BloodInventory, BloodRequest, BloodTest, syncDatabase };