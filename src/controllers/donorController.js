const donorService = require("../services/donorService");

// Lấy danh sách tất cả người hiến máu
exports.getAllDonors = async(req, res) => {
    try {
        const donors = await donorService.getAllDonors();
        res.status(200).json({ success: true, data: donors });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người hiến máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
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
        console.error("Lỗi khi lấy thông tin người hiến máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Thêm một người hiến máu mới
exports.createDonor = async(req, res) => {
    try {
        const { name, age, gender, blood_type, last_donation } = req.body;

        // Kiểm tra điều kiện hiến máu (Tuổi từ 18 - 60)
        if (age < 18 || age > 60) {
            return res.status(400).json({ success: false, message: "Người hiến máu phải từ 18 đến 60 tuổi." });
        }

        // Kiểm tra lần hiến máu gần nhất (Không quá sớm)
        const today = new Date();
        const lastDonationDate = new Date(last_donation);
        const monthsSinceLastDonation = (today - lastDonationDate) / (1000 * 60 * 60 * 24 * 30);
        if (monthsSinceLastDonation < 3) {
            return res.status(400).json({ success: false, message: "Cần ít nhất 3 tháng giữa các lần hiến máu." });
        }

        const newDonor = await donorService.createDonor(req.body);
        res.status(201).json({ success: true, message: "Thêm người hiến máu thành công", data: newDonor });
    } catch (error) {
        console.error("Lỗi khi thêm người hiến máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
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
        console.error("Lỗi khi cập nhật thông tin người hiến máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
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
        console.error("Lỗi khi xóa người hiến máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Tìm kiếm người hiến máu theo nhóm máu hoặc địa điểm
exports.searchDonors = async(req, res) => {
    try {
        const { bloodType, location } = req.query;
        const donors = await donorService.searchDonors(bloodType, location);

        if (donors.length === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người hiến máu phù hợp" });
        }

        res.status(200).json({ success: true, data: donors });
    } catch (error) {
        console.error("Lỗi khi tìm kiếm người hiến máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Thêm lịch sử hiến máu của một người hiến máu
exports.addDonationHistory = async(req, res) => {
    try {
        const { donorId, date, quantity } = req.body;

        const donor = await donorService.getDonorById(donorId);
        if (!donor) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người hiến máu" });
        }

        const newHistory = { date, quantity };
        let history = donor.history || [];
        history.push(newHistory);

        await donorService.updateDonor(donorId, { history });

        res.status(200).json({ success: true, message: "Cập nhật lịch sử hiến máu thành công", history });
    } catch (error) {
        console.error("Lỗi khi thêm lịch sử hiến máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};