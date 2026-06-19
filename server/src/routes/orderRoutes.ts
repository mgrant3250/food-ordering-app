import express, { Router } from "express"
import {
    placeOrder,
    getAllOrders,
    updateOrderStatus,
} from "../controllers/orderController"
import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";

const router: Router = express.Router();

router.post("/order", authMiddleware, placeOrder);
router.get("/admin/orders", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/admin/orders/:id", authMiddleware, adminMiddleware, updateOrderStatus);


export default router