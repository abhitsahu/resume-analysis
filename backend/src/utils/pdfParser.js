const pdf = require('pdf-parse');
const axios = require('axios');
const fs = require('fs');
const logger = require('./logger');

/**
 * Extract text from a PDF buffer
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text content
 */
async function extractTextFromBuffer(pdfBuffer) {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    logger.error('PDF buffer extraction error:', error);
    throw new Error('Error extracting text from PDF buffer.');
  }
}

/**
 * Extract text from a PDF at a URL
 * @param {string} url - URL of the PDF file
 * @returns {Promise<string>} - Extracted text content
 */
async function extractTextFromURL(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = await pdf(response.data);
    return data.text;
  } catch (error) {
    logger.error('PDF URL extraction error:', error);
    throw new Error('Error extracting text from PDF URL.');
  }
}

/**
 * Extract text from a local PDF file
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} - Extracted text content
 */
async function extractTextFromFile(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    logger.error('PDF file extraction error:', error);
    throw new Error('Error extracting text from PDF file.');
  }
}

module.exports = { extractTextFromBuffer, extractTextFromURL, extractTextFromFile };
