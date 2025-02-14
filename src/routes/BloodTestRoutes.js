const express = require("express");
const {
    getAllTests,
    getTestById,
    createTest,
    updateTest,
    deleteTest
} = require("../controllers/bloodTestController"); // 🔥 Kiểm tra đường dẫn này

const router = express.Router();

// Routes xét nghiệm máu
router.get("/", getAllTests);
router.get("/:id", getTestById);
router.post("/", createTest);
router.put("/:id", updateTest);
router.delete("/:id", deleteTest);

module.exports = router;