
import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  businessType: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
}, { collection: "ContactInfo" });

export default mongoose.model("Contact", contactSchema);
