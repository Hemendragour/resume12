import { Router } from "express";

import {
  analyze,
  getATSScore,
} from "./ats.controller";

import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.use(protect);

// ⚡ Free ATS Score
router.get(
  "/score/:resumeId",
  getATSScore
);

// 🤖 AI ATS Analysis
router.post(
  "/analyze",
  analyze
);

export default router;