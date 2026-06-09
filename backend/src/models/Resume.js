const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: { type: String, required: true },
    filePath: { type: String },
    fileSize: { type: Number },
    // Raw extracted text (optional, can be large)
    extractedText: { type: String },
    // AI Analysis Results
    analysis: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      education: [
        {
          degree: String,
          branch: String,
          institution: String,
          year: String,
        },
      ],
      experience: [
        {
          job_title: String,
          company: String,
          start_date: String,
          end_date: String,
          description: String,
        },
      ],
      skills: [String],
      summary: { type: String },
      atsScore: { type: Number, min: 0, max: 100, default: 0 },
      strengths: [String],
      missingKeywords: [String],
      recommendations: [String],
      categoryScores: {
        skills: { type: Number, min: 0, max: 100, default: 0 },
        experience: { type: Number, min: 0, max: 100, default: 0 },
        education: { type: Number, min: 0, max: 100, default: 0 },
        formatting: { type: Number, min: 0, max: 100, default: 0 },
        impact: { type: Number, min: 0, max: 100, default: 0 },
      },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Index for faster queries
resumeSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Resume", resumeSchema);
