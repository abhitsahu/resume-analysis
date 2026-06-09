const crypto = require("crypto");

const IV_LENGTH = 16;

/**
 * Get the encryption key from environment variables
 * Deferred check to allow env to be loaded first
 */
function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (!key || Buffer.byteLength(key) !== 32) {
    throw new Error("Invalid key length: The encryption key must be 32 bytes long.");
  }
  return key;
}

/**
 * Encrypt a plaintext string using AES-256-CBC
 * @param {string} text - The plaintext to encrypt
 * @returns {{ encryptedData: string, iv: string }}
 */
function encrypt(text) {
  const ENCRYPTION_KEY = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
  };
}

/**
 * Decrypt an encrypted string using AES-256-CBC
 * @param {{ encryptedData: string, iv: string }} encryptedDataObject
 * @returns {string|null} - Decrypted string or null on failure
 */
function decrypt(encryptedDataObject) {
  if (!encryptedDataObject || !encryptedDataObject.iv || !encryptedDataObject.encryptedData) {
    return null;
  }

  try {
    const ENCRYPTION_KEY = getEncryptionKey();
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      Buffer.from(encryptedDataObject.iv, "hex")
    );
    let decrypted = decipher.update(Buffer.from(encryptedDataObject.encryptedData, "hex"), "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    return null;
  }
}

module.exports = { encrypt, decrypt };
