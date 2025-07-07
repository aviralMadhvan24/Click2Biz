import mongoose from "mongoose";
import mainConnection from "../db/mainConnection.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  createdAt: { type: Date, default: Date.now },
}, { collection: "Users" });

export default mainConnection.model("User", userSchema);
