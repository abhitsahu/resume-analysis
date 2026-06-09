require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require("../utils/logger");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Analyze resume text with Gemini AI
 * Returns structured data including ATS score, skills analysis, and recommendations
 * @param {string} text - Extracted resume text
 * @returns {Promise<Object>} - Comprehensive resume analysis
 */
async function analyzeResume(text) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert resume analyzer and ATS (Applicant Tracking System) specialist. Analyze the following resume text and provide a comprehensive JSON analysis.

Resume Text:
${text}

Respond with ONLY a valid JSON object (no markdown formatting, no code blocks) with this exact structure:
{
  "name": "<full name>",
  "email": "<primary email>",
  "phone": "<phone number if found, or null>",
  "education": [
    {
      "degree": "<degree name>",
      "branch": "<field of study>",
      "institution": "<institution name>",
      "year": "<graduation year>"
    }
  ],
  "experience": [
    {
      "job_title": "<job title>",
      "company": "<company name>",
      "start_date": "<start date>",
      "end_date": "<end date or Present>",
      "description": "<brief description>"
    }
  ],
  "skills": ["<skill1>", "<skill2>"],
  "summary": "<2-3 sentence professional summary>",
  "atsScore": <number 0-100>,
  "strengths": [
    "<strength 1>",
    "<strength 2>",
    "<strength 3>"
  ],
  "missingKeywords": [
    "<keyword 1>",
    "<keyword 2>"
  ],
  "recommendations": [
    "<actionable recommendation 1>",
    "<actionable recommendation 2>",
    "<actionable recommendation 3>",
    "<actionable recommendation 4>"
  ],
  "categoryScores": {
    "skills": <number 0-100>,
    "experience": <number 0-100>,
    "education": <number 0-100>,
    "formatting": <number 0-100>,
    "impact": <number 0-100>
  }
}

Scoring Guidelines:
- atsScore: Overall ATS compatibility (keyword density, formatting, section organization)
- skills: Rate based on relevance and breadth of technical skills
- experience: Rate based on detail, metrics, and progression
- education: Rate based on relevance and credentials
- formatting: Rate based on resume structure and readability
- impact: Rate based on quantifiable achievements and action verbs

Be honest but constructive in recommendations. Provide specific, actionable advice.`;

    const result = await model.generateContent(prompt);

    if (result.response) {
      const responseText = result.response.text();
      // Remove any markdown code block formatting
      const jsonStr = responseText.replace(/```json\n?|```\n?/g, '').trim();
      const parsed = JSON.parse(jsonStr);

      // Ensure email is a string
      if (Array.isArray(parsed.email)) {
        parsed.email = parsed.email[0] || '';
      }

      // Ensure atsScore is a number
      parsed.atsScore = Number(parsed.atsScore) || 0;

      logger.info(`Resume analyzed successfully for: ${parsed.name}`);
      return parsed;
    } else {
      throw new Error("Invalid response from Gemini API.");
    }
  } catch (error) {
    logger.error("Gemini API Error:", {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      errorDetails: error.errorDetails,
      stack: error.stack,
    });
    throw new Error("Failed to process resume with AI.");
  }
}

/**
 * Legacy function for backward compatibility
 * @param {string} text - Resume text
 * @returns {Promise<Object>} - Structured resume data
 */
async function getStructuredResumeData(text) {
  return analyzeResume(text);
}

module.exports = { analyzeResume, getStructuredResumeData };
