import { Router } from "express";

import { protect } from "../../middleware/auth.middleware";

import {
  startInterview,
  submitInterviewAnswer,
  endInterview,
  getSession,
  getHistory,
} from "./interview.controller";

const router = Router();

// ============================================================
// Authentication
// ============================================================

router.use(protect);

// ============================================================
// SESSION HISTORY
// ============================================================

router.get("/history", getHistory);

// ============================================================
// START INTERVIEW
// ============================================================

router.post("/start", startInterview);

// ============================================================
// SUBMIT ANSWER (returns feedback + next question, or completes session)
// ============================================================

router.post("/submit-answer", submitInterviewAnswer);

// ============================================================
// GET SESSION
// ============================================================

router.get("/:sessionId", getSession);

// ============================================================
// END SESSION EARLY
// ============================================================

router.post("/:sessionId/end", endInterview);

export default router;
