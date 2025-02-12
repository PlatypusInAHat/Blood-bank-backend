const { Donor } = require("../models");

// Lấy danh sách người hiến máu
exports.getAllDonors = async(req, res) => {
    try {
        const donors = await Donor.findAll();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Thêm người hiến máu mới
exports.createDonor = async(req, res) => {
    try {
        const { name, age, gender, blood_type, last_donation } = req.body;
        const newDonor = await Donor.create({ name, age, gender, blood_type, last_donation });
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Xóa người hiến máu
exports.deleteDonor = async(req, res) => {
    try {
        const { id } = req.params;
        await Donor.destroy({ where: { id } });
        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};