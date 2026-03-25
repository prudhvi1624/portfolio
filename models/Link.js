import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  userId: String,
  title: String,
  url: String,
  order: Number
});

export default mongoose.model("Link", linkSchema);