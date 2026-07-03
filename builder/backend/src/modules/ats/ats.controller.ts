import { Response } from "express";

import { Resume } from "../../models/resume.model";
import { ResumeAnalysis } from "../../models/resume-analysis.model";

import { AuthRequest } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";

import { analyzeResumeSchema } from "./ats.validation";
import { analyzeResume } from "./ats.service";
import { trackAIUsage } from "../../services/ai-usage.service";
import { calculateATSScore } from "./ats.engine";

export const analyze = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { resumeId, jobDescription } =
      analyzeResumeSchema.parse(req.body);

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }

    const result = await analyzeResume(
      resume.toObject(),
      jobDescription
    );

    const analysis = await ResumeAnalysis.create({
      userId: req.userId,
      resumeId,
      ...result,
    });

    await trackAIUsage(
      req.userId!,
      "ats-analysis"
    );

    res.status(200).json({
      success: true,
      analysis,
    });
  }
);




export const getATSScore = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const resume = await Resume.findOne({
      _id: req.params.resumeId,
      userId: req.userId,
    });

    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }

    const result = calculateATSScore(
      resume.toObject()
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);