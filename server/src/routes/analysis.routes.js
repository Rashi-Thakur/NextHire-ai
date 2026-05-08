import { Router } from "express";
import {
  createAnalysis,
  extractResume,
  getAnalysisById,
  getAnalysisHistory,
} from "../controllers/analysis.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadPdf } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/extract", protect, uploadPdf.single("resume"), extractResume);
router.post("/", protect, createAnalysis);
router.get("/", protect, getAnalysisHistory);
router.get("/:id", protect, getAnalysisById);

export default router;
