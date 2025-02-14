const nodemailer = require("nodemailer");

// Cấu hình transporter sử dụng OAuth2 để bảo mật
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: process.env.EMAIL_ACCESS_TOKEN, // Token có thể được cập nhật tự động
    }
});

// Gửi email thông thường (Văn bản hoặc HTML)
const sendEmail = async(to, subject, text, html = null) => {
    try {
        let mailOptions = {
            from: `"Blood Bank System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: html || text // Nếu có HTML thì dùng, nếu không thì fallback về text
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email đã gửi thành công đến ${to}`);
    } catch (error) {
        console.error("❌ Lỗi khi gửi email:", error);
        throw new Error("Gửi email thất bại!");
    }
};

// Gửi email khi kho máu cạn
const sendLowStockAlert = async(bloodType, quantity) => {
    const hospitalEmails = process.env.HOSPITAL_ALERT_EMAILS.split(","); // Danh sách email nhận cảnh báo

    const subject = "⚠️ Cảnh báo kho máu sắp hết";
    const text = `Kho máu của bạn sắp hết! Hiện tại chỉ còn ${quantity} đơn vị nhóm máu ${bloodType}. Vui lòng nhập thêm máu ngay!`;
    const html = `
        <h2>⚠️ Cảnh báo kho máu sắp hết</h2>
        <p><strong>Nhóm máu:</strong> ${bloodType}</p>
        <p><strong>Số lượng còn lại:</strong> ${quantity} đơn vị</p>
        <p>Vui lòng nhập thêm máu sớm nhất có thể.</p>
    `;

    for (let email of hospitalEmails) {
        await sendEmail(email, subject, text, html);
    }
};

module.exports = { sendEmail, sendLowStockAlert };