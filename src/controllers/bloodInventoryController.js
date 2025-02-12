const { BloodInventory } = require("../models");

// Lấy danh sách kho máu
exports.getAllBlood = async(req, res) => {
    try {
        const bloodStock = await BloodInventory.findAll();
        res.status(200).json(bloodStock);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Cập nhật số lượng máu
exports.updateBloodStock = async(req, res) => {
    try {
        const { blood_type, quantity } = req.body;
        const bloodRecord = await BloodInventory.findOne({ where: { blood_type } });

        if (!bloodRecord) {
            return res.status(404).json({ message: "Nhóm máu không tồn tại" });
        }

        bloodRecord.quantity += quantity;
        await bloodRecord.save();

        res.status(200).json({ message: "Cập nhật thành công", bloodRecord });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};