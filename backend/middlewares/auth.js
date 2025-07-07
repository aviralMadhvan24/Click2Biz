import jwt from 'jsonwebtoken';

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
