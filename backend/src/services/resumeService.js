const resumeRepository = require('../repositories/resumeRepository');
const { analyzeResume } = require('../config/gemini');
const { extractTextFromBuffer, extractTextFromURL, extractTextFromFile } = require('../utils/pdfParser');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

class ResumeService {
  /**
   * Upload and analyze a resume from file
   */
  async uploadAndAnalyze(userId, file) {
    if (!file) {
      throw new AppError('No file uploaded', 400);
    }

    // Create resume record with pending status
    const resume = await resumeRepository.create({
      userId,
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      status: 'processing',
    });

    try {
      // Extract text from PDF
      const extractedText = await extractTextFromFile(file.path);
      if (!extractedText || extractedText.trim().length === 0) {
        throw new AppError('Could not extract text from PDF. The file may be image-based or corrupted.', 400);
      }

      // Analyze with Gemini AI
      const analysis = await analyzeResume(extractedText);

      // Update resume with analysis
      const updatedResume = await resumeRepository.updateById(resume._id, {
        extractedText,
        analysis,
        status: 'completed',
      });

      logger.info(`Resume analyzed successfully: ${file.originalname} (Score: ${analysis.atsScore})`);
      return updatedResume;
    } catch (error) {
      // Mark as failed
      await resumeRepository.updateById(resume._id, { status: 'failed' });
      logger.error(`Resume analysis failed: ${file.originalname}`, error);
      throw error;
    }
  }

  /**
   * Analyze resume from URL
   */
  async analyzeFromURL(userId, url) {
    const resume = await resumeRepository.create({
      userId,
      fileName: url.split('/').pop() || 'resume.pdf',
      status: 'processing',
    });

    try {
      const extractedText = await extractTextFromURL(url);
      if (!extractedText || extractedText.trim().length === 0) {
        throw new AppError('Could not extract text from PDF URL.', 400);
      }

      const analysis = await analyzeResume(extractedText);

      const updatedResume = await resumeRepository.updateById(resume._id, {
        extractedText,
        analysis,
        status: 'completed',
      });

      logger.info(`URL resume analyzed: ${url} (Score: ${analysis.atsScore})`);
      return updatedResume;
    } catch (error) {
      await resumeRepository.updateById(resume._id, { status: 'failed' });
      throw error;
    }
  }

  /**
   * Get all resumes for a user (paginated)
   */
  async getUserResumes(userId, query = {}) {
    const { page = 1, limit = 10 } = query;
    return resumeRepository.findByUserId(userId, { page, limit });
  }

  /**
   * Get a single resume analysis
   */
  async getResumeById(resumeId, userId) {
    const resume = await resumeRepository.findById(resumeId);
    if (!resume) {
      throw new AppError('Resume not found', 404);
    }

    // Ensure user owns the resume
    const resumeUserId = resume.userId._id || resume.userId;
    if (resumeUserId.toString() !== userId.toString()) {
      throw new AppError('Not authorized to view this resume', 403);
    }

    return resume;
  }

  /**
   * Get dashboard stats
   */
  async getDashboardStats(userId) {
    return resumeRepository.getStatsByUserId(new mongoose.Types.ObjectId(userId));
  }

  /**
   * Search resumes by name
   */
  async searchResumes(userId, name) {
    if (!name) {
      throw new AppError('Search name is required', 400);
    }
    return resumeRepository.searchByName(userId, name);
  }
}

module.exports = new ResumeService();
