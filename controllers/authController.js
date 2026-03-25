import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hash
  });

  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json("Invalid credentials");

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token, user });
};