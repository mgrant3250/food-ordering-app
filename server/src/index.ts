import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import menuRoutes from "./routes/menuRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();
const PORT : number = Number(process.env.PORT) || 5000;
const CLIENT_URL: string = process.env.CLIENT_URL || "*";
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());


app.use('/images', express.static('public/images'));
app.use("/uploads", express.static("uploads"));


app.get("/health", (req : Request, res : Response) => {
  res.status(200).json({ status: "ok" });
});


app.use("/api", authRoutes);
app.use("/api", menuRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api", paymentRoutes)

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });