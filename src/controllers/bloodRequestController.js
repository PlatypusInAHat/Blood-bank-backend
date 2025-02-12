const { BloodRequest, BloodInventory } = require("../models");

// Lấy danh sách yêu cầu máu
exports.getAllRequests = async(req, res) => {
    try {
        const requests = await BloodRequest.findAll();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Tạo yêu cầu máu mới
exports.createRequest = async(req, res) => {
    try {
        const { hospital_name, blood_type, quantity } = req.body;
        const request = await BloodRequest.create({ hospital_name, blood_type, quantity });

        res.status(201).json({ message: "Yêu cầu được tạo", request });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};