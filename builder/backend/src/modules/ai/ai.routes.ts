import { Router } from "express";

import {
  generateSummary,
  rewriteExperience,
  suggestSkills,
  generateProjectDescription,
  generateExperience,
  generateCoursework,
  generateCustomSection,
  generateInternship,
  generateResume,
} from "./ai.controller";

import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/summary", generateSummary);

router.post("/rewrite-experience", rewriteExperience);

router.post("/suggest-skills", suggestSkills);

router.post("/project", generateProjectDescription);

router.post("/experience", generateExperience);

router.post("/coursework", generateCoursework);

router.post("/custom-section", generateCustomSection);

router.post("/internship", generateInternship);

router.post("/generate-resume", generateResume);

export default router;
