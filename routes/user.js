import express from "express";
import User from "../models/User.js";
import multer from "multer";

const router = express.Router();

// ✅ SAVE TEMPLATE
router.post("/template", async (req, res) => {
  const { userId, template } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { template },
    { new: true }
  );

  res.json(user);
});
// GET USER PROFILE
router.get("/:username", async (req, res) => {
  const user = await User.findOne({ name: req.params.username });

  if (!user) return res.status(404).json("User not found");

  res.json(user);
});
// ✅ SAVE LINKS
router.post("/links", async (req, res) => {
  const { userId, links } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { links },
    { new: true }
  );

  res.json(user);
});

// ✅ UPDATE PLAN
router.post("/plan", async (req, res) => {
  const { userId, plan } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { plan },
    { new: true }
  );

  res.json(user);
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// UPLOAD PROFILE PIC
router.post("/upload/:id", upload.single("image"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { profilePic: req.file.filename },
    { new: true }
  );

  res.json(user);
});

export default router; // ✅ VERY IMPORTANT