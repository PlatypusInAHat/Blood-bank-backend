const { Donor } = require("../models");

// Lấy danh sách người hiến máu
const getAllDonors = async() => {
    return await Donor.findAll();
};

// Lấy một người hiến máu theo ID
const getDonorById = async(id) => {
    return await Donor.findByPk(id);
};

// Thêm một người hiến máu mới
const createDonor = async(data) => {
    return await Donor.create(data);
};

// Cập nhật thông tin người hiến máu
const updateDonor = async(id, data) => {
    const donor = await Donor.findByPk(id);
    if (!donor) return null;
    return await donor.update(data);
};

// Xóa người hiến máu
const deleteDonor = async(id) => {
    const donor = await Donor.findByPk(id);
    if (!donor) return null;
    await donor.destroy();
    return { message: "Xóa thành công" };
};

module.exports = { getAllDonors, getDonorById, createDonor, updateDonor, deleteDonor };