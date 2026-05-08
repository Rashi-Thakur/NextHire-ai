import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    resumeText: { type: String, required: true },
    jobDescription: { type: String, required: true },
    atsScores: {
      overall: Number,
      technicalSkill: Number,
      softSkill: Number,
      compatibility: Number,
      readability: Number,
      formatting: Number,
    },
    missingSkills: [String],
    matchedSkills: [String],
    suggestedKeywords: [String],
    strengths: [String],
    weaknesses: [String],
    aiFeedback: {
      summary: String,
      improvementSuggestions: [String],
      rewrittenBullets: [String],
      suggestedProjects: [String],
      recommendedCertifications: [String],
      strongerActionVerbs: [String],
    },
    topJobRoles: [String],
    reportMeta: {
      resumeWordCount: Number,
      jdWordCount: Number,
      keywordDensity: Number,
    },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
