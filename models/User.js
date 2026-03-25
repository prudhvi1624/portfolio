import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  plan: {
    type: String,
    default: "free"
  },
  
  links: {
    type: Array,
    default: []
  },
  profilePic: {
    type: String,
    default: ""
  }
});

export default mongoose.model("User", userSchema);