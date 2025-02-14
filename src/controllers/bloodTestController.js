const { BloodTest } = require("../models");

// Lấy tất cả các xét nghiệm máu
exports.getAllTests = async(req, res) => {
    try {
        const tests = await BloodTest.findAll();
        res.status(200).json({ success: true, data: tests });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Lấy xét nghiệm máu theo ID
exports.getTestById = async(req, res) => {
    try {
        const test = await BloodTest.findByPk(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xét nghiệm máu!" });
        }
        res.status(200).json({ success: true, data: test });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Thêm xét nghiệm máu mới
exports.createTest = async(req, res) => {
    try {
        const newTest = await BloodTest.create(req.body);
        res.status(201).json({ success: true, data: newTest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Cập nhật xét nghiệm máu
exports.updateTest = async(req, res) => {
    try {
        const test = await BloodTest.findByPk(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xét nghiệm máu!" });
        }
        await test.update(req.body);
        res.status(200).json({ success: true, message: "Cập nhật thành công!", data: test });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Xóa xét nghiệm máu
exports.deleteTest = async(req, res) => {
    try {
        const test = await BloodTest.findByPk(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xét nghiệm máu!" });
        }
        await test.destroy();
        res.status(200).json({ success: true, message: "Xóa thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};