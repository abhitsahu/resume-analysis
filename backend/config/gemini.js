require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Function to send resume text to Gemini API and get structured data.
 * @param {string} text - Extracted resume text.
 * @returns {Promise<Object>} - Structured resume JSON response.
 */
async function getStructuredResumeData(text) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Extract structured resume data from this text and format it as a JSON object:\n\n${text}\n\nThe JSON format should include:
    {
      "name": "<name>",
      "email": "<single_email_or_first_email>",
      "emails": ["<all_emails>"],
      "education": [{
        "degree": "<degree>",
        "branch": "<branch>",
        "institution": "<institution>",
        "year": "<year>"
      }],
      "experience": [{
        "job_title": "<job_title>",
        "company": "<company>",
        "start_date": "<start_date>",
        "end_date": "<end_date>"
      }],
      "skills": ["<skill1>", "<skill2>", "..."],
      "summary": "<A brief summary of the candidate's profile>"
    }`;

    const result = await model.generateContent(prompt);
    console.log("Sending request to Gemini API:", { prompt });

    if (result.response) {
      const text = result.response.text();
      // Remove markdown code block formatting and clean the response
      const jsonStr = text.replace(/```json\n|\n```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      
      // Ensure email is a string if multiple emails exist
      if (Array.isArray(parsed.email)) {
        parsed.email = parsed.email[0] || '';
      }
      
      return parsed;
    } else {
      throw new Error("Invalid response from Gemini API.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error.response ? error.response.data : error.message);
    throw new Error("Failed to process resume with AI.");
  }
}

module.exports = { getStructuredResumeData };
