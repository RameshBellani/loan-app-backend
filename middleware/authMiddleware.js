// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Log the decoded payload for debugging
      console.log("Decoded Token:", decoded);

      const user = await User.findById(decoded.userId);

      // Log the fetched user and their role
      console.log("User Role:", user?.role);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }

      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

module.exports = auth;
