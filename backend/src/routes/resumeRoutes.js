const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authenticate = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const validate = require('../middlewares/validate');
const { urlAnalyzeValidator, searchValidator } = require('../validators/resumeValidator');

/**
 * @swagger
 * /api/resume/upload:
 *   post:
 *     summary: Upload and analyze a resume PDF
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Resume analyzed successfully
 */
router.post('/upload', authenticate, upload.single('resume'), resumeController.uploadResume);

/**
 * @swagger
 * /api/resume/enrich:
 *   post:
 *     summary: Analyze resume from URL
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [url]
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resume analyzed successfully
 */
router.post('/enrich', authenticate, urlAnalyzeValidator, validate, resumeController.enrichFromURL);

/**
 * @swagger
 * /api/resume/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get('/stats', authenticate, resumeController.getStats);

/**
 * @swagger
 * /api/resume/search:
 *   post:
 *     summary: Search resumes by name
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 */
router.post('/search', authenticate, searchValidator, validate, resumeController.searchResumes);

/**
 * @swagger
 * /api/resume:
 *   get:
 *     summary: Get all resumes for current user
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of resumes
 */
router.get('/', authenticate, resumeController.getResumes);

/**
 * @swagger
 * /api/resume/{id}:
 *   get:
 *     summary: Get single resume analysis
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume analysis details
 */
router.get('/:id', authenticate, resumeController.getResumeById);

module.exports = router;
