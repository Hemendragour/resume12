 

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
} from "./ai.controller";

import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/summary", generateSummary);

router.post(
  "/rewrite-experience",
  rewriteExperience
);

router.post(
  "/suggest-skills",
  suggestSkills
);

router.post(
  "/project",
  generateProjectDescription
);

router.post(
  "/experience",
  generateExperience
);

router.post("/coursework", generateCoursework);

router.post("/custom-section", generateCustomSection  );


router.post("/internship", generateInternship);

export default router;