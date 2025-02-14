const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Donor = sequelize.define("Donor", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
        gender: { type: DataTypes.ENUM("male", "female", "other"), allowNull: false },
        blood_type: { type: DataTypes.STRING(5), allowNull: false },
        last_donation: { type: DataTypes.DATE, allowNull: true },
        history: { type: DataTypes.JSON, allowNull: true }, // Thêm lịch sử hiến máu
    });

    return Donor;
};