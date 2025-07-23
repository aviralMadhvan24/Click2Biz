
import mongoose from 'mongoose';
import crypto   from 'crypto';
import dotenv   from 'dotenv';
import AdminInvite from '../models/AdminInvite.model.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24*60*60*1000); // 24h
  await AdminInvite.create({ token, expiresAt: expires });
  console.log('Invite token:', token);
  process.exit();
}

run();
