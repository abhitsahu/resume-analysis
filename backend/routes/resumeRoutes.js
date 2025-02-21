const express = require("express");
const { getStructuredResumeData } = require("../config/gemini");
const { extractTextFromPDF } = require("../utils/pdfParser");
const Applicant = require("../models/Applicant");
const verifyToken = require("../middleware/authMiddleware");
const { encrypt, decrypt } = require("../utils/encryption");
const router = express.Router();


// Resume data enrichment API
router.post("/enrich", verifyToken, async (req, res) => {
    const { url } = req.body;
    try {
        const resumeText = await extractTextFromPDF(url);
        if (!resumeText) return res.status(500).json({ error: "Failed to extract text" });

        const structuredData = await getStructuredResumeData(resumeText);

        // Encrypt sensitive data before saving
        const encryptedName = encrypt(structuredData.name);
        const encryptedEmail = encrypt(structuredData.email);
        const encryptedSummary = encrypt(structuredData.summary || '');
        const encryptedData = {
            name: encryptedName.encryptedData,
            email: encryptedEmail.encryptedData,
            summary: encryptedSummary.encryptedData,
            iv: encryptedName.iv,
            education: structuredData.education,
            experience: structuredData.experience,
            skills: structuredData.skills
        };

        const newApplicant = new Applicant(encryptedData);
        await newApplicant.save();

        res.status(200).json({ message: "Resume stored successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





// Resume search API
router.post("/search", verifyToken, async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required for search" });

    try {
        // Retrieve all applicants
        const allApplicants = await Applicant.find();

        if (!allApplicants.length) return res.status(404).json({ error: "No applicants found in database" });

        // Decrypt all names before searching
        const decryptedApplicants = allApplicants.map(applicant => {
            if (!applicant.iv) {
                console.error("Missing IV for applicant:", applicant);
                return null; // Skip records without IV
            }

            try {
                return {
                    ...applicant.toObject(),
                    name: decrypt({ iv: applicant.iv, encryptedData: applicant.name }), // 🟢 Use IV for decryption
                    email: decrypt({ iv: applicant.iv, encryptedData: applicant.email }),
                    summary: decrypt({ iv: applicant.iv, encryptedData: applicant.summary })
                };
            } catch (error) {
                console.error("Decryption failed for applicant:", error.message);
                return null; // Skip if decryption fails
            }
        }).filter(Boolean); // Remove null values

        // Search by decrypted name
        const filteredApplicants = decryptedApplicants.filter(applicant =>
            applicant.name.toLowerCase().includes(name.toLowerCase())
        );

        if (!filteredApplicants.length) return res.status(404).json({ error: "No applicants found" });

        res.status(200).json(filteredApplicants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
