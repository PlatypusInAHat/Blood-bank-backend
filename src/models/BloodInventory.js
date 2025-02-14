const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodInventory = sequelize.define("BloodInventory", {
        blood_type: {
            type: DataTypes.STRING(5),
            allowNull: false,
            primaryKey: true, // 🔥 Đặt blood_type làm PRIMARY KEY để khóa ngoại hoạt động
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    return BloodInventory;
};