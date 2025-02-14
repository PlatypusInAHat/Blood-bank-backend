# 🏥 Blood Bank Management System - Backend

🚀 **Hệ thống quản lý ngân hàng máu** được xây dựng bằng **Node.js, Express.js, PostgreSQL** để quản lý **người hiến máu, yêu cầu máu, kho máu và xác thực người dùng**.


---

## 🛠 **Công Nghệ Sử Dụng**
- **Node.js** + **Express.js** → Xây dựng API backend
- **PostgreSQL** + **Sequelize ORM** → Quản lý database
- **JWT (JSON Web Token)** → Xác thực người dùng
- **Bcrypt.js** → Mã hóa mật khẩu
- **CORS & Helmet** → Bảo mật API
- **Swagger** → Tạo tài liệu API tự động
- **Nodemailer** → Gửi email xác nhận

---

## 🔥 **Chức Năng Chính**
### 🏥 **Xác Thực Người Dùng (`/api/auth`)**
✅ Đăng ký tài khoản (`POST /register`)  
✅ Đăng nhập (`POST /login`)  
✅ Lấy thông tin người dùng (`GET /me`)  

### 🩸 **Quản Lý Yêu Cầu Máu (`/api/requests`)**
✅ Lấy danh sách yêu cầu máu (`GET /`)  
✅ Tạo yêu cầu máu mới (`POST /`)  
✅ Phê duyệt yêu cầu máu (`PUT /:id/approve`) *(Admin)*  
✅ Xóa yêu cầu máu (`DELETE /:id`) *(Admin)*  

### 🏥 **Quản Lý Người Hiến Máu (`/api/donors`)**
✅ Lấy danh sách người hiến máu (`GET /`)  
✅ Tìm kiếm người hiến máu theo nhóm máu (`GET /search?bloodType=O+`)  

### 🏥 **Quản Lý Kho Máu (`/api/blood`)**
✅ Lấy thông tin kho máu (`GET /`)  
✅ Cập nhật số lượng máu (`PUT /update`) *(Admin)*  

---

## 🚀 **Hướng Dẫn Cài Đặt**
### 1️⃣ **Cài Đặt Node.js Và PostgreSQL**
📌 **Kiểm tra phiên bản:**  
```sh
node -v
npm -v
psql --version
