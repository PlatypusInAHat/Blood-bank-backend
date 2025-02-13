const errorHandler = (err, req, res, next) => {
    console.error("🔥 Lỗi:", err.message);
    res.status(500).json({ message: "Có lỗi xảy ra trên server!" });
};

module.exports = errorHandler;