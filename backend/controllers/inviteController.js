// controllers/inviteController.js
import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import User   from '../models/User.model.js';
import AdminInvite from '../models/AdminInvite.model.js';
import crypto from 'crypto';
export const generateInvite = async (req, res) => {
  try {
    // create a 32‑byte hex token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24*60*60*1000); // 24h from now

    const invite = await AdminInvite.create({ token, expiresAt: expires });
    
    res.status(201).json({
      message: 'Invite token generated',
      token: invite.token,
      expiresAt: invite.expiresAt
    });
  } catch (err) {
    console.error('Error generating invite:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



export const inviteRegister = async (req, res) => {
  const { token, name, email, password } = req.body;
  // 1) find a valid, unused invite
  const invite = await AdminInvite.findOne({
    token,
    used: false,
    expiresAt: { $gt: Date.now() }
  });
  if (!invite) {
    return res.status(403).json({ message: 'Invalid or expired invite token' });
  }
  // 2) create the admin user
  const hashed = await bcrypt.hash(password, 10);
  const admin = await User.create({
    name, email, password: hashed, role: 'admin'
  });
  // 3) mark invite as used
  invite.used = true;
  await invite.save();
  // 4) respond with a JWT
  const jwtToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(201).json({
    message: 'Admin account created',
    token: jwtToken,
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role
  });
};
