const Applicant = require("../models/Applicant");
const pdf = require('pdf-parse');
const { getStructuredResumeData } = require("../config/gemini");
const axios = require('axios');
const Tesseract = require("tesseract.js");
const { encrypt, decrypt } = require('../utils/encryption');

exports.searchResume = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required for search" });
    }

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const allApplicants = await Applicant.find();

    // Decrypt the data before filtering
    const decryptedApplicants = allApplicants.map(applicant => {
      if (!applicant.iv) {
        console.error("Missing IV for applicant:", applicant);
        return null; // Skip records without IV
      }

      return {
        ...applicant.toObject(),
        name: decrypt({
          iv: applicant.iv,
          encryptedData: applicant.name
        }),
        email: decrypt({
          iv: applicant.iv,
          encryptedData: applicant.email
        }),
        summary: decrypt({
          iv: applicant.iv,
          encryptedData: applicant.summary
        })
      };
    }).filter(Boolean); 

    // Filter applicants based on decrypted name
    const filteredApplicants = decryptedApplicants.filter(applicant => 
      applicant.name.toLowerCase().includes(name.toLowerCase())
    );

    if (filteredApplicants.length === 0) {
      return res.status(404).json({ error: "No applicants found" });
    }

    res.status(200).json(filteredApplicants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function extractTextFromPDF(pdfBuffer) {
    try {
        const data = await pdf(pdfBuffer);
        return data.text; // Extracted text from PDF
    } catch (error) {
        console.error("PDF Extraction Error:", error);
        throw new Error("Error extracting text from PDF.");
    }
}

// Change from function declaration to export
exports.extractTextFromImage = async (imagePath) => {
    const { data: { text } } = await Tesseract.recognize(imagePath, "eng");
    return text;
};

// Function to analyze resume data using Google Gemini API
// async function analyzeResume
exports.enrichResume = async (req, res) => {
    const { pdfBuffer } = req.body;
    try {
        let text = await extractTextFromPDF(pdfBuffer);
        if (!text) {
            console.log("PDF extraction returned no text");
            return res.status(400).json({ error: "No text could be extracted from PDF" });
        }

        const extractedData = await getStructuredResumeData(text);

        // Encrypt sensitive data before saving
        const encryptedName = encrypt(extractedData.name);
        const encryptedEmail = encrypt(extractedData.email);
        const encryptedSummary = encrypt(extractedData.summary || '');

        const encryptedData = {
            name: encryptedName.encryptedData,
            email: encryptedEmail.encryptedData,
            summary: encryptedSummary.encryptedData,
            iv: encryptedName.iv,
            education: extractedData.education,
            experience: extractedData.experience,
            skills: extractedData.skills
        };

        const newApplicant = new Applicant(encryptedData);
        await newApplicant.save();

        res.status(200).json({ message: "Resume stored successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error processing resume" });
    }
};


// New function to handle PDF URL
exports.handlePDFUrl = async (req, res) => {
    try {
        const { url } = req.body;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const pdfBuffer = Buffer.from(response.data);

        const extractedText = await extractTextFromPDF(pdfBuffer);
        if (!extractedText) {
            return res.status(500).json({ error: "Error extracting text from PDF." });
        }

        const resumeData = await getStructuredResumeData(extractedText);

        const encryptedData = {
            ...resumeData,
            name: encrypt(resumeData.name),
            email: encrypt(resumeData.email),
            summary: encrypt(resumeData.summary)
        };

        const newApplicant = new Applicant(encryptedData);
        await newApplicant.save();

        const responseData = {
            ...resumeData,
            name: decrypt(encryptedData.name),
            email: decrypt(encryptedData.email),
            summary: decrypt(encryptedData.summary)
        };

        res.status(200).json({ 
            message: "Resume stored successfully", 
            data: responseData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
