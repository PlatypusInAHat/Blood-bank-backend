const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodRequest = sequelize.define("BloodRequest", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        hospital_name: { type: DataTypes.STRING, allowNull: false },
        blood_type: { type: DataTypes.STRING(5), allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.ENUM("pending", "approved", "rejected"), defaultValue: "pending" }
    });

    return BloodRequest;
};