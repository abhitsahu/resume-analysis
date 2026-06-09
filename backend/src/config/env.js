const logger = require('../utils/logger');

/**
 * Validates required environment variables on startup
 * Fails fast with clear error messages
 */
function validateEnv() {
  const required = [
    'MONGO_URI',
    'JWT_SECRET',
    'GEMINI_API_KEY',
    'ENCRYPTION_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  // Validate ENCRYPTION_KEY length
  if (Buffer.byteLength(process.env.ENCRYPTION_KEY) !== 32) {
    logger.error('ENCRYPTION_KEY must be exactly 32 bytes long');
    process.exit(1);
  }

  logger.info('Environment variables validated successfully');
}

module.exports = { validateEnv };
