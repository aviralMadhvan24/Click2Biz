import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  clientEmail: {
    type: String,
    required: true
  },
  items: [{
    bundleId: String,
    name: String,
     price: Number, 
    category: String
  }],
  total: Number,
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { collection: "Purchases" });

export default mongoose.model("Purchase", purchaseSchema);
