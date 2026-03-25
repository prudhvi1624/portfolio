import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import linkRoutes from "./routes/links.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

// ✅ middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err.message));

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));

// test
app.get("/", (req, res) => {
  res.send("API running...");
});

// ✅ server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});