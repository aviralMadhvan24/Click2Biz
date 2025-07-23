import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String }, 
  otpExpiry: { type: Date }
}, { collection: "Users" });

export default mongoose.model("User", userSchema);
