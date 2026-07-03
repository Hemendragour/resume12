// import { Response } from "express";

// import { asyncHandler } from "../../utils/asyncHandler";
// import { AuthRequest } from "../../middleware/auth.middleware";
// import { trackAIUsage } from "../../services/ai-usage.service";

// import {
//   generateSummaryService,
//   rewriteExperienceService,
//   suggestSkillsService,
//   generateProjectService,
// } from "./ai.service";
 

// export const generateSummary = asyncHandler(
//   async (req: AuthRequest, res: Response) => {
//     const { resumeId } = req.body;

//     const resume = await Resume.findOne({
//       _id: resumeId,
//       userId: req.userId,
//     });

//     if (!resume) {
//       throw new ApiError(404, "Resume not found");
//     }

//     const summary =
//       await generateSummaryService(
//         resume.toObject()
//       );

//     await trackAIUsage(
//       req.userId!,
//       "generate-summary"
//     );

//     res.status(200).json({
//       success: true,
//       summary,
//     });
//   }
// );

// export const rewriteExperience = asyncHandler(
//   async (req: AuthRequest, res: Response) => {
//     const { experience, targetRole } = req.body;

//     const content = await rewriteExperienceService(
//       experience,
//       targetRole
//     );

//     await trackAIUsage(
//       req.userId!,
//       "rewrite-experience"
//     );

//     res.status(200).json({
//       success: true,
//       content,
//     });
//   }
// );

// export const suggestSkills = asyncHandler(
//   async (req: AuthRequest, res: Response) => {
//     const { jobTitle } = req.body;

//     const skills = await suggestSkillsService(jobTitle);

//     await trackAIUsage(
//       req.userId!,
//       "suggest-skills"
//     );

//     res.status(200).json({
//       success: true,
//       skills,
//     });
//   }
// );

// export const generateProject = asyncHandler(
//   async (req: AuthRequest, res: Response) => {
//     const { projectName, technologies } = req.body;

//     const content = await generateProjectService(
//       projectName,
//       technologies
//     );

//     await trackAIUsage(
//       req.userId!,
//       "generate-project"
//     );

//     res.status(200).json({
//       success: true,
//       content,
//     });
//   }
// );

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
    const { resumeId } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId,
    });

    if (!resume) {
      throw new ApiError(
        404,
        "Resume not found"
      );
    }

    const skills =
      await suggestSkillsService(
        resume.toObject()
      );

    await trackAIUsage(
      req.userId!,
      "suggest-skills"
    );

    res.status(200).json({
      success: true,
      skills,
    });
  }
);

export const generateProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const {
      projectName,
      technologies,
    } = req.body;

    const content =
      await generateProjectService(
        projectName,
        technologies
      );

    await trackAIUsage(
      req.userId!,
      "generate-project"
    );

    res.status(200).json({
      success: true,
      content,
    });
  }
);

export const generateExperience =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        company,
        position,
      } = req.body;

      const responsibilities =
        await generateExperienceService(
          company,
          position
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
      } = req.body;

      const description =
        await generateProjectDescriptionService(
          projectName,
          technologies
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