const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.register({ name, email, password });

  res.status(201).json({
    status: 'success',
    data: { user, token },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login({ email, password });

  res.status(200).json({
    status: 'success',
    data: { user, token },
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await authService.updateProfile(req.user.id, { name });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
