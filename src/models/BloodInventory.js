const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodInventory = sequelize.define("BloodInventory", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        blood_type: { type: DataTypes.STRING(5), allowNull: false },
        quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
    });

    return BloodInventory;
};