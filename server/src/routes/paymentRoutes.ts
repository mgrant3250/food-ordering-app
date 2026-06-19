import express, { Router } from "express"
import authMiddleware from "../middleware/authMiddleware";
import { createPayment } from "../controllers/paymentController";

const router : Router = express.Router();

router.post("/create-payment-intent", authMiddleware, createPayment);

export default router