const { body, query } = require('express-validator');

const uploadValidator = [];

const urlAnalyzeValidator = [
  body('url')
    .trim()
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Please provide a valid URL'),
];

const searchValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Search name is required')
    .isLength({ min: 2 })
    .withMessage('Search name must be at least 2 characters'),
];

module.exports = { uploadValidator, urlAnalyzeValidator, searchValidator };
