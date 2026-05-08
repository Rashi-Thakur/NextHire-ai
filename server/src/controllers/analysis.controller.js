import Analysis from "../models/Analysis.js";
import { analyzeResumeAgainstJD } from "../services/ats.service.js";
import { extractTextFromPdfBuffer } from "../services/pdf.service.js";
import { generateAiFeedback } from "../services/ai.service.js";

export const extractResume = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("Resume PDF is required");
      err.statusCode = 400;
      throw err;
    }
    const resumeText = await extractTextFromPdfBuffer(req.file.buffer);
    res.json({ success: true, resumeText });
  } catch (error) {
    next(error);
  }
};

export const createAnalysis = async (req, res, next) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      const err = new Error("resumeText and jobDescription are required");
      err.statusCode = 400;
      throw err;
    }
    const atsResult = analyzeResumeAgainstJD(resumeText, jobDescription);
    const aiFeedback = await generateAiFeedback({
      resumeText,
      jobDescription,
      missingSkills: atsResult.missingSkills,
    });

    const record = await Analysis.create({
      user: req.user._id,
      resumeText,
      jobDescription,
      ...atsResult,
      aiFeedback,
    });
    res.status(201).json({ success: true, analysis: record });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisHistory = async (req, res, next) => {
  try {
    const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, items: history });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisById = async (req, res, next) => {
  try {
    const item = await Analysis.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      const err = new Error("Analysis not found");
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, analysis: item });
  } catch (error) {
    next(error);
  }
};
