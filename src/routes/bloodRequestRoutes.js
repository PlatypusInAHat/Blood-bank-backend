const express = require("express");
const { getAllRequests, getRequestById, createRequest, approveRequest, deleteRequest } = require("../controllers/bloodRequestController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Lấy danh sách tất cả yêu cầu máu
 *     tags: [Blood Requests]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/", authenticate, getAllRequests);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết yêu cầu máu
 *     tags: [Blood Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/:id", authenticate, getRequestById);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Tạo yêu cầu máu mới
 *     tags: [Blood Requests]
 *     responses:
 *       201:
 *         description: Tạo yêu cầu thành công
 */
router.post("/", authenticate, authorize(["hospital"]), createRequest);

/**
 * @swagger
 * /api/requests/{requestId}/approve:
 *   put:
 *     summary: Phê duyệt yêu cầu máu
 *     tags: [Blood Requests]
 *     responses:
 *       200:
 *         description: Phê duyệt thành công
 */
router.put("/:requestId/approve", authenticate, authorize(["admin"]), approveRequest);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Xóa yêu cầu máu
 *     tags: [Blood Requests]
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/:id", authenticate, authorize(["admin"]), deleteRequest);

module.exports = router;