const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

/**
 * JWT Authentication Middleware
 * Extracts token from Authorization header and verifies it
 */
const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Access denied. No token provided.', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Token has expired. Please login again.', 401));
    }
    return next(new AppError('Invalid token.', 401));
  }
};

module.exports = authenticate;
