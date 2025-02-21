const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY || Buffer.byteLength(ENCRYPTION_KEY) !== 32) {
    throw new Error("Invalid key length: The encryption key must be 32 bytes long.");
}

const IV_LENGTH = 16;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
        encryptedData: encrypted,
        iv: iv.toString("hex") // 🟢 FIX: Ensure IV is included
    };
}

function decrypt(encryptedDataObject) {
    if (!encryptedDataObject || !encryptedDataObject.iv || !encryptedDataObject.encryptedData) {
        console.error("Decryption error: Missing IV or encrypted data", encryptedDataObject);
        return null; // Return null instead of crashing
    }

    try {
        let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), Buffer.from(encryptedDataObject.iv, "hex"));
        let decrypted = decipher.update(Buffer.from(encryptedDataObject.encryptedData, "hex"), "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (error) {
        console.error("Decryption failed:", error.message);
        return null; // Return null instead of crashing
    }
}

module.exports = { encrypt, decrypt };
