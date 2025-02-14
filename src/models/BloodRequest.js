const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodRequest = sequelize.define("BloodRequest", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hospital_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        blood_type: {
            type: DataTypes.STRING(5),
            allowNull: false,
            references: {
                model: "BloodInventory", // 🔥 Đảm bảo khóa ngoại tham chiếu đúng
                key: "blood_type",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "rejected"),
            defaultValue: "pending",
        },
    });

    return BloodRequest;
};