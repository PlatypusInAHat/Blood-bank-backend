const donorService = require("../services/donorService");

// Lấy danh sách tất cả người hiến máu
exports.getAllDonors = async(req, res) => {
    try {
        const donors = await donorService.getAllDonors();
        res.status(200).json({ success: true, data: donors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy thông tin một người hiến máu theo ID
exports.getDonorById = async(req, res) => {
    try {
        const donor = await donorService.getDonorById(req.params.id);
        if (!donor) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người hiến máu" });
        }
        res.status(200).json({ success: true, data: donor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Thêm một người hiến máu mới
exports.createDonor = async(req, res) => {
    try {
        const newDonor = await donorService.createDonor(req.body);
        res.status(201).json({ success: true, message: "Thêm người hiến máu thành công", data: newDonor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật thông tin người hiến máu
exports.updateDonor = async(req, res) => {
    try {
        const updatedDonor = await donorService.updateDonor(req.params.id, req.body);
        if (!updatedDonor) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người hiến máu" });
        }
        res.status(200).json({ success: true, message: "Cập nhật thành công", data: updatedDonor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Xóa người hiến máu theo ID
exports.deleteDonor = async(req, res) => {
    try {
        const result = await donorService.deleteDonor(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người hiến máu" });
        }
        res.status(200).json({ success: true, message: "Xóa thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};