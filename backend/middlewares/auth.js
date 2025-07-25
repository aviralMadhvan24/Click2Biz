import jwt from 'jsonwebtoken';

import User from '../models/User.model.js';
// Verify Token Middleware
export  function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Received token:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing, please login." });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

// Check Admin Role Middleware
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied, admins only." });
  }
  next();
};

// Check Client Role Middleware
export const isClient = (req, res, next) => {
  if (req.user.role !== 'client') {
    return res.status(403).json({ message: "Access denied, clients only." });
  }
  next();
};





export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user:", decoded);

    // 🔴 THIS IS THE MISSING PART
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    req.user = user; 
    
    console.log("Authenticated user:", req.user._id);

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
