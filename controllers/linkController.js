import Link from "../models/Link.js";

export const createLink = async (req, res) => {
  const link = await Link.create(req.body);
  res.json(link);
};

export const getLinks = async (req, res) => {
  const links = await Link.find({ userId: req.params.userId });
  res.json(links);
};

export const deleteLink = async (req, res) => {
  await Link.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};