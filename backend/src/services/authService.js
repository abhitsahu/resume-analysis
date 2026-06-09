const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

class AuthService {
  /**
   * Register a new user
   */
  async register({ name, email, password }) {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    const user = await userRepository.create({ name, email, password });
    const token = this.generateToken(user);

    logger.info(`New user registered: ${email}`);
    return { user, token };
  }

  /**
   * Login a user
   */
  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = this.generateToken(user);

    logger.info(`User logged in: ${email}`);
    return { user, token };
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updateData) {
    const user = await userRepository.updateById(userId, updateData);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  /**
   * Generate JWT token
   */
  generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
}

module.exports = new AuthService();
