const { BloodInventory, Donor, BloodRequest } = require("../models");
const { sequelize } = require("../models"); // Đảm bảo đường


// 📊 1️⃣ Báo cáo tổng số lượng máu theo nhóm máu
exports.getBloodReport = async(req, res) => {
    try {
        const report = await BloodInventory.findAll({
            attributes: [
                "blood_type", [sequelize.fn("SUM", sequelize.col("quantity")), "total_quantity"]
            ],
            group: ["blood_type"]
        });

        res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.error("Lỗi khi tạo báo cáo máu:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// 🏥 2️⃣ Báo cáo tổng số lần hiến máu theo bệnh viện
exports.getDonationReport = async(req, res) => {
    try {
        const report = await Donor.findAll({
            attributes: [
                "hospital", [sequelize.fn("COUNT", sequelize.col("id")), "total_donations"]
            ],
            group: ["hospital"]
        });

        res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.error("Lỗi khi tạo báo cáo hiến máu:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// 🔥 3️⃣ Báo cáo số lượng yêu cầu máu đã xử lý & bị từ chối
exports.getBloodRequestReport = async(req, res) => {
    try {
        const report = await BloodRequest.findAll({
            attributes: [
                "status", [sequelize.fn("COUNT", sequelize.col("id")), "total_requests"]
            ],
            group: ["status"]
        });

        res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.error("Lỗi khi tạo báo cáo yêu cầu máu:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// 🩸 4️⃣ Báo cáo số lượng người hiến máu theo nhóm máu
exports.getDonorReport = async(req, res) => {
    try {
        const report = await Donor.findAll({
            attributes: [
                "blood_type", [sequelize.fn("COUNT", sequelize.col("id")), "total_donors"]
            ],
            group: ["blood_type"]
        });

        res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.error("Lỗi khi tạo báo cáo người hiến máu:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// 📅 5️⃣ Báo cáo tình trạng hiến máu theo ngày/tháng/năm
exports.getDonationTrends = async(req, res) => {
    try {
        const { timeframe } = req.query; // timeframe: "daily", "monthly", "yearly"
        let groupByFormat = "";

        if (timeframe === "daily") {
            groupByFormat = sequelize.fn("DATE", sequelize.col("last_donation"));
        } else if (timeframe === "monthly") {
            groupByFormat = sequelize.fn("DATE_FORMAT", sequelize.col("last_donation"), "%Y-%m");
        } else if (timeframe === "yearly") {
            groupByFormat = sequelize.fn("YEAR", sequelize.col("last_donation"));
        } else {
            return res.status(400).json({ message: "Tham số timeframe không hợp lệ!" });
        }

        const report = await Donor.findAll({
            attributes: [
                [groupByFormat, "timeframe"],
                [sequelize.fn("COUNT", sequelize.col("id")), "total_donations"]
            ],
            group: ["timeframe"],
            order: [
                ["timeframe", "ASC"]
            ]
        });

        res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.error("Lỗi khi tạo báo cáo xu hướng hiến máu:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};