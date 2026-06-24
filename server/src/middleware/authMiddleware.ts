import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import { AuthRequest, UserPayload } from "../types/AuthRequest";

dotenv.config();

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Missing token",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (typeof decoded === "string") {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    req.user = decoded as UserPayload;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;