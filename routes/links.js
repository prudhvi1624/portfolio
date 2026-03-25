import express from "express";
import Link from "../models/Link.js";

const router = express.Router();

// ➕ ADD LINK
router.post("/", async (req, res) => {
  const { userId, title, url } = req.body;

  const newLink = new Link({ userId, title, url });
  await newLink.save();

  res.json(newLink);
});

// 📥 GET LINKS
router.get("/:userId", async (req, res) => {
  const links = await Link.find({ userId: req.params.userId });
  res.json(links);
});

// 🔀 REORDER
router.post("/reorder", async (req, res) => {
  const { userId, links } = req.body;

  await Link.deleteMany({ userId });

  const newLinks = links.map((l) => ({
    userId,
    title: l.title,
    url: l.url,
  }));

  await Link.insertMany(newLinks);

  res.json({ message: "Reordered" });
});

export default router;