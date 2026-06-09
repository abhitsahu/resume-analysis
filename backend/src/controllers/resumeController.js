const resumeService = require('../services/resumeService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Upload and analyze a resume
 * @route   POST /api/resume/upload
 * @access  Private
 */
exports.uploadResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.uploadAndAnalyze(req.user.id, req.file);

  res.status(201).json({
    status: 'success',
    message: 'Resume uploaded and analyzed successfully',
    data: { resume },
  });
});

/**
 * @desc    Analyze resume from URL
 * @route   POST /api/resume/enrich
 * @access  Private
 */
exports.enrichFromURL = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const resume = await resumeService.analyzeFromURL(req.user.id, url);

  res.status(200).json({
    status: 'success',
    message: 'Resume analyzed successfully',
    data: { resume },
  });
});

/**
 * @desc    Get all resumes for current user
 * @route   GET /api/resume
 * @access  Private
 */
exports.getResumes = asyncHandler(async (req, res) => {
  const result = await resumeService.getUserResumes(req.user.id, req.query);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

/**
 * @desc    Get single resume analysis
 * @route   GET /api/resume/:id
 * @access  Private
 */
exports.getResumeById = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(req.params.id, req.user.id);

  res.status(200).json({
    status: 'success',
    data: { resume },
  });
});

/**
 * @desc    Get dashboard stats
 * @route   GET /api/resume/stats
 * @access  Private
 */
exports.getStats = asyncHandler(async (req, res) => {
  const stats = await resumeService.getDashboardStats(req.user.id);

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});

/**
 * @desc    Search resumes by name
 * @route   POST /api/resume/search
 * @access  Private
 */
exports.searchResumes = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const resumes = await resumeService.searchResumes(req.user.id, name);

  res.status(200).json({
    status: 'success',
    data: { resumes },
  });
});
