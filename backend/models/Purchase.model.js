// ✅ SOLUTION: include clientName and clientEmail inside Purchase schema again
// and make sure they are populated from req.user on server side

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
  },services: [{
    name:       String,           // e.g. "GMB Setup"
    bundleType: String,           // e.g. "Digital Kickstart"
    status:     { type: String, enum: ["todo","done"], default: "todo" },
    doneAt:     Date
  }]
}, { collection: "Purchases" });

export default mongoose.model("Purchase", purchaseSchema);
