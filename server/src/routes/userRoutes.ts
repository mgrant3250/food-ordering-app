import express, { Router } from "express"
import {
    getAllUsers,
    updateUserRole,
    deleteUser,
} from "../controllers/userController"
import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";

const router: Router = express.Router();


router.get('/admin/users', authMiddleware, adminMiddleware, getAllUsers);
router.patch('/admin/user/:id/role', authMiddleware, adminMiddleware, updateUserRole);
router.delete('/admin/user/:id', authMiddleware, adminMiddleware, deleteUser)

export default router