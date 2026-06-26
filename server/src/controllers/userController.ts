import { Request, Response } from "express";
import User from "../models/User";

/* -------------------- Get All Users -------------------- */

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* -------------------- Update User Role -------------------- */

export const updateUserRole = async (
  req: Request<{ id: string }, {}, { role: string }>,
  res: Response
): Promise<void> => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      res.status(400).json({
        success: false,
        message: "Invalid role",
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update role",
    });
  }
};

/* -------------------- Delete User -------------------- */

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};