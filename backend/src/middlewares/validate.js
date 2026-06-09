const { validationResult } = require('express-validator');

/**
 * Middleware to check validation results from express-validator
 * Returns 400 with array of error messages if validation fails
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      errors: extractedErrors,
    });
  }
  next();
};

module.exports = validate;
