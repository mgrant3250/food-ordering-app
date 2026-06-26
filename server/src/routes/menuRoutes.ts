import express, { Router } from "express";

import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController";

import adminMiddleware from "../middleware/adminMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import uploadMiddleware from "../middleware/upload";

const router: Router = express.Router();

router.get("/menu", getMenu);

router.post(
  "/menu",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  addMenuItem
);

router.put(
  "/menu/:id",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  updateMenuItem
);

router.delete(
  "/menu/:id",
  authMiddleware,
  adminMiddleware,
  deleteMenuItem
);

export default router;