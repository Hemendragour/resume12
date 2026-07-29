 

import { Response } from "express";

import { Resume } from "../../models/resume.model";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";

import { AuthRequest } from "../../middleware/auth.middleware";
import { trackAIUsage } from "../../services/ai-usage.service";

import {
  generateSummaryService,
  rewriteExperienceService,
  suggestSkillsService,
  generateProjectService,
  generateExperienceService,
  generateProjectDescriptionService,
  generateCourseworkService,
  generateCustomSectionService,
  generateInternshipService,
} from "./ai.service";

export const generateSummary = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { resumeId } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }

    const summary =
      await generateSummaryService(
        resume.toObject()
      );

    await trackAIUsage(
      req.userId!,
      "generate-summary"
    );

    res.status(200).json({
      success: true,
      summary,
    });
  }
);

export const rewriteExperience = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { experience, targetRole } = req.body;

    const content =
      await rewriteExperienceService(
        experience,
        targetRole
      );

    await trackAIUsage(
      req.userId!,
      "rewrite-experience"
    );

    res.status(200).json({
      success: true,
      content,
    });
  }
);

export const suggestSkills = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { resumeId, selectedCategory } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }

    const skills = await suggestSkillsService(resume.toObject(), selectedCategory);

    await trackAIUsage(req.userId!, "suggest-skills");

    res.status(200).json({
      success: true,
      skills,
    });
  }
);

export const generateExperience = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { company, position, context } = req.body;

    const responsibilities = await generateExperienceService(
      company,
      position,
      context
    );

      await trackAIUsage(
        req.userId!,
        "generate-experience"
      );

      res.status(200).json({
        success: true,
        responsibilities,
      });
    }
  );



  export const generateProjectDescription =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        projectName,
        technologies,
        context,
      } = req.body;

      const description =
        await generateProjectDescriptionService(
          projectName,
          technologies,
          context
        );

      await trackAIUsage(
        req.userId!,
        "generate-project-description"
      );

      res.status(200).json({
        success: true,
        description,
      });
    }
  );

  export const generateCoursework = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { degree, fieldOfStudy, targetRole } = req.body;

    const coursework = await generateCourseworkService(
      degree,
      fieldOfStudy,
      targetRole
    );

    await trackAIUsage(req.userId!, "generate-coursework");

    res.status(200).json({
      success: true,
      coursework,
    });
  }
);


export const generateCustomSection = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { sectionType, itemTitle, itemSubtitle, context } = req.body;

    const description = await generateCustomSectionService(
      sectionType,
      itemTitle,
      itemSubtitle,
      context
    );

    await trackAIUsage(req.userId!, "generate-custom-section");

    res.status(200).json({
      success: true,
      description,
    });
  }
);



export const generateInternship = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { company, role, context } = req.body;

    const description = await generateInternshipService(company, role, context);

    await trackAIUsage(req.userId!, "generate-internship");

    res.status(200).json({
      success: true,
      description,
    });
  }
);