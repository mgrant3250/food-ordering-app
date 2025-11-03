const express = require("express");
const { placeOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/order", authMiddleware, placeOrder);
router.get("/admin/orders", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/admin/orders/:id", authMiddleware, adminMiddleware, updateOrderStatus);


module.exports = router;