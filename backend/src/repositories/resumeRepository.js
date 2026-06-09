const Resume = require('../models/Resume');

class ResumeRepository {
  async create(resumeData) {
    const resume = new Resume(resumeData);
    return resume.save();
  }

  async findById(id) {
    return Resume.findById(id).populate('userId', 'name email');
  }

  async findByUserId(userId, { page = 1, limit = 10, sort = '-createdAt' } = {}) {
    const skip = (page - 1) * limit;
    const [resumes, total] = await Promise.all([
      Resume.find({ userId }).sort(sort).skip(skip).limit(limit),
      Resume.countDocuments({ userId }),
    ]);

    return {
      resumes,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateById(id, updateData) {
    return Resume.findByIdAndUpdate(id, updateData, { new: true });
  }

  async getStatsByUserId(userId) {
    const stats = await Resume.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalUploads: { $sum: 1 },
          avgScore: { $avg: '$analysis.atsScore' },
          maxScore: { $max: '$analysis.atsScore' },
          minScore: { $min: '$analysis.atsScore' },
        },
      },
    ]);

    const recentAnalyses = await Resume.find({ userId })
      .sort('-createdAt')
      .limit(5)
      .select('fileName analysis.atsScore analysis.name status createdAt');

    // Score distribution
    const scoreDistribution = await Resume.aggregate([
      { $match: { userId } },
      {
        $bucket: {
          groupBy: '$analysis.atsScore',
          boundaries: [0, 20, 40, 60, 80, 101],
          default: 'unknown',
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    return {
      totalUploads: stats[0]?.totalUploads || 0,
      avgScore: Math.round(stats[0]?.avgScore || 0),
      maxScore: stats[0]?.maxScore || 0,
      minScore: stats[0]?.minScore || 0,
      recentAnalyses,
      scoreDistribution,
    };
  }

  async searchByName(userId, name) {
    return Resume.find({
      userId,
      'analysis.name': { $regex: name, $options: 'i' },
    }).sort('-createdAt');
  }
}

module.exports = new ResumeRepository();
