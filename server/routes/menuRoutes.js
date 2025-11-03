const express = require("express");
const { getMenu, addMenuItem } = require("../controllers/menuController");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/menu", getMenu);

router.post("/menu", authMiddleware, adminMiddleware, addMenuItem);

module.exports = router;