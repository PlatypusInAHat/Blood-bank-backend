const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false, // Tắt log SQL nếu không cần
    }
);

// Load Models
const User = require("./User")(sequelize);
const Donor = require("./Donor")(sequelize);
const BloodInventory = require("./BloodInventory")(sequelize);
const BloodRequest = require("./BloodRequest")(sequelize);

// Quan hệ giữa các model
User.hasMany(BloodRequest, { foreignKey: "userId" });
BloodRequest.belongsTo(User, { foreignKey: "userId" });

Donor.hasMany(BloodRequest, { foreignKey: "donorId" });
BloodRequest.belongsTo(Donor, { foreignKey: "donorId" });

module.exports = { sequelize, User, Donor, BloodInventory, BloodRequest };