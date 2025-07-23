// models/SupportRequest.model.js
import mongoose from 'mongoose';

const supportRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purchaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'in-progress', 'resolved'], 
    default: 'open' 
  },
  attachments: [{
    url: String,
    name: String
  }],
  responses: [{
    message: String,
    from: { type: String, enum: ['client', 'support'], required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('SupportRequest', supportRequestSchema);