import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

import User from "../models/User";
import sendEmail from "../utils/sendEmail";

dotenv.config();

/* -------------------- Request Bodies -------------------- */

interface RegisterBody {
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface ForgotPasswordBody {
  email: string;
}

interface ResetPasswordBody {
  token: string;
  password: string;
}

/* -------------------- Register -------------------- */

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      res.status(400).json({
        message: "Email already in use",
      });
      return;
    }

    const assignedRole: "user" = "user";

    const newUser = new User({
      email,
      password,
      role: assignedRole,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        email,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      email,
      role: newUser.role,
    });
  } catch (err) {
    console.error("Register error:", err);

    res.status(500).json({
      message: "Error registering user",
    });
  }
};

/* -------------------- Login -------------------- */

export const loginUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const isMatch = await (user as any).comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const token = jwt.sign(
      {
        email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      email,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);

    res.status(500).json({
      message: "Error logging in",
    });
  }
};

/* -------------------- Forgot Password -------------------- */

export const forgotPassword = async (
  req: Request<{}, {}, ForgotPasswordBody>,
  res: Response
): Promise<void> => {
  const email = req.body.email?.toLowerCase();

  if (!email) {
    res.status(400).json({
      message: "Email is required",
    });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        success: true,
        message: "If the email exists, a reset link was sent.",
      });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(
      Date.now() + 1000 * 60 * 15
    );

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}" target="_blank">
          Reset your password
        </a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (err) {
    console.error("Forgot password error:", err);

    res.status(500).json({
      message: "Error sending reset email",
    });
  }
};

/* -------------------- Reset Password -------------------- */

export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordBody>,
  res: Response
): Promise<void> => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
      return;
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (err) {
    console.error("Reset password error:", err);

    res.status(500).json({
      message: "Error resetting password",
    });
  }
};