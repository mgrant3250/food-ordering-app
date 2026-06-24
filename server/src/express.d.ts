import "express";

// declare module "express" {
//   export interface Request {
//     user?: {
//       id: string;
//       role: "admin" | "user";
//     };
//   }
// }

import { JwtPayload } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: JwtPayload & {
      id: string;
      role: "admin" | "user";
    };
  }
}