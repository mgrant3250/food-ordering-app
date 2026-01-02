const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const assignedRole = "user";

    const newUser = new User({ email, password, role: assignedRole });
    await newUser.save();

    const token = jwt.sign({ email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token, email, role: newUser.role });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token, email, role: user.role});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email?.toLowerCase();

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: true, message: "If the email exists, a reset link was sent." });

    // Create reset token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15); // 15 minute expiration
    await user.save();

    
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    
    await sendEmail({
      from: `"Food Ordering App" <${process.env.EMAIL_USER}>`,
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
    res.status(500).json({ message: "Error sending reset email" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;     
  const { password } = req.body;    

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
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
    res.status(500).json({ message: "Error resetting password" });
  }
};