import express, { Router } from "express"
import {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
} from "../controllers/authController"
const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router