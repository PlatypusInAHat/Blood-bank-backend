const { BloodRequest, User } = require("../models");
const sendEmail = require("../services/emailService");

// Lấy danh sách tất cả yêu cầu máu
exports.getAllRequests = async(req, res) => {
    try {
        const requests = await BloodRequest.findAll();
        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy chi tiết một yêu cầu máu theo ID
exports.getRequestById = async(req, res) => {
    try {
        const request = await BloodRequest.findByPk(req.params.id);
        if (!request) return res.status(404).json({ message: "Không tìm thấy yêu cầu máu" });

        res.status(200).json({ success: true, data: request });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Tạo yêu cầu máu mới
exports.createRequest = async(req, res) => {
    try {
        const { hospital_name, blood_type, quantity, user_id } = req.body;

        const newRequest = await BloodRequest.create({ hospital_name, blood_type, quantity, user_id });

        res.status(201).json({ success: true, message: "Tạo yêu cầu thành công", data: newRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Phê duyệt yêu cầu máu
exports.approveRequest = async(req, res) => {
    try {
        const { requestId } = req.params;
        const { adminId } = req.body;

        const request = await BloodRequest.findByPk(requestId);
        if (!request) return res.status(404).json({ message: "Yêu cầu không tồn tại" });

        request.status = "approved";
        request.approved_by = adminId;
        await request.save();

        // Gửi email thông báo
        await sendEmail(request.hospital_email, "Yêu cầu máu đã được duyệt", `Yêu cầu máu của bạn đã được duyệt.`);

        res.status(200).json({ success: true, message: "Yêu cầu đã được phê duyệt", data: request });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Xóa yêu cầu máu
exports.deleteRequest = async(req, res) => {
    try {
        const request = await BloodRequest.findByPk(req.params.id);
        if (!request) return res.status(404).json({ message: "Không tìm thấy yêu cầu máu" });

        await request.destroy();
        res.status(200).json({ success: true, message: "Xóa yêu cầu thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};