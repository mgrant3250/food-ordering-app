const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.use('/images', express.static('public/images'));




app.use("/api", authRoutes);
app.use("/api", menuRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api", paymentRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});