
import mongoose from 'mongoose';

const adminInviteSchema = new mongoose.Schema({
  token:    { type: String, required: true, unique: true },
  used:     { type: Boolean, default: false },
  expiresAt:{ type: Date, required: true }
}, { collection: 'AdminInvites' });

export default mongoose.model('AdminInvite', adminInviteSchema);
