import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";

const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({
      message: "Access denied: Admins only",
    });
    return;
  }

  next();
};

export default adminMiddleware;