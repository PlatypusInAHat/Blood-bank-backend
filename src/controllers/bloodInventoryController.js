const { BloodInventory } = require("../models");
const { Op } = require("sequelize");

// Lấy danh sách kho máu
exports.getAllBlood = async(req, res) => {
    try {
        const bloodStock = await BloodInventory.findAll();
        res.status(200).json({ success: true, data: bloodStock });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Cập nhật số lượng máu (Nhập thêm vào kho)
exports.updateBloodStock = async(req, res) => {
    try {
        const { blood_type, quantity, expiry_date } = req.body;

        // Kiểm tra số lượng máu nhập vào có hợp lệ không
        if (quantity <= 0) {
            return res.status(400).json({ success: false, message: "Số lượng máu phải lớn hơn 0!" });
        }

        let bloodRecord = await BloodInventory.findOne({ where: { blood_type } });

        if (!bloodRecord) {
            // Nếu nhóm máu chưa tồn tại, tạo mới
            bloodRecord = await BloodInventory.create({ blood_type, quantity, expiry_date });
        } else {
            // Nếu nhóm máu đã có, cập nhật số lượng
            bloodRecord.quantity += quantity;
            bloodRecord.expiry_date = expiry_date; // Cập nhật hạn sử dụng mới nhất
            await bloodRecord.save();
        }

        res.status(200).json({ success: true, message: "Cập nhật kho máu thành công", data: bloodRecord });
    } catch (error) {
        console.error("Lỗi khi cập nhật kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Tự động xóa máu hết hạn khỏi kho
exports.removeExpiredBlood = async() => {
    try {
        const today = new Date();
        const expiredBlood = await BloodInventory.destroy({ where: { expiry_date: {
                    [Op.lt]: today } } });

        console.log(`Đã xóa ${expiredBlood} đơn vị máu hết hạn khỏi kho.`);
    } catch (error) {
        console.error("Lỗi khi xóa máu hết hạn:", error);
    }
};

// Kiểm tra kho máu trước khi duyệt yêu cầu
exports.checkBloodAvailability = async(req, res) => {
    try {
        const { blood_type, quantity } = req.body;

        const bloodRecord = await BloodInventory.findOne({ where: { blood_type } });

        if (!bloodRecord || bloodRecord.quantity < quantity) {
            return res.status(400).json({ success: false, message: "Không đủ máu trong kho để duyệt yêu cầu!" });
        }

        res.status(200).json({ success: true, message: "Kho máu đủ để duyệt yêu cầu" });
    } catch (error) {
        console.error("Lỗi khi kiểm tra kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Xuất kho máu khi phê duyệt yêu cầu
exports.deductBloodStock = async(req, res) => {
    try {
        const { blood_type, quantity } = req.body;

        const bloodRecord = await BloodInventory.findOne({ where: { blood_type } });

        if (!bloodRecord || bloodRecord.quantity < quantity) {
            return res.status(400).json({ success: false, message: "Không đủ máu để xuất kho!" });
        }

        // Trừ số lượng máu
        bloodRecord.quantity -= quantity;
        await bloodRecord.save();

        res.status(200).json({ success: true, message: "Xuất kho thành công", data: bloodRecord });
    } catch (error) {
        console.error("Lỗi khi xuất kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};