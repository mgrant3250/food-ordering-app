const express = require("express");
const { getMenu, addMenuItem } = require("../controllers/menuController");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/upload")

router.get("/menu", getMenu);

router.post("/menu", authMiddleware, adminMiddleware, uploadMiddleware.single("image"), addMenuItem);

module.exports = router;