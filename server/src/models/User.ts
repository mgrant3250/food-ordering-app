// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String, 
//         required: true, 
//         unique: true
//     },
//     password: {
//         type: String, 
//         required: true
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     },

//     resetPasswordToken: {
//       type: String,

//     },
//     resetPasswordExpires: {
//       type: Date,
//     }
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.comparePassword = function(password) {
//   return bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

/* -------------------- Types -------------------- */

export type UserRole = "user" | "admin";

/* -------------------- Schema -------------------- */

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpires: {
    type: Date,
  },
});

/* -------------------- Types -------------------- */

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User> & {
  comparePassword(password: string): Promise<boolean>;
};

/* -------------------- Middleware -------------------- */

userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

/* -------------------- Instance Methods -------------------- */

userSchema.methods.comparePassword = function (
  this: UserDocument,
  password: string
) {
  return bcrypt.compare(password, this.password);
};

/* -------------------- Model -------------------- */

const UserModel = model<User>("User", userSchema);

export default UserModel;