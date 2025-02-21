const pdf = require('pdf-parse');
const axios = require('axios');

async function extractTextFromPDF(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = await pdf(response.data);
    return data.text;
  } catch (error) {
    throw new Error("Error extracting text from PDF.");
  }
}

module.exports = { extractTextFromPDF };
