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
  let token;
  
  // 1. Get token from headers or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      message: 'You are not logged in! Please log in to get access.' 
    });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // 4. Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        message: 'User recently changed password! Please log in again.'
      });
    }

    // 5. Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(401).json({ 
      message: 'Invalid token. Please log in again.' 
    });
  }
};