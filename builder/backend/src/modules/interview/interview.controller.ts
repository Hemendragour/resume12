import { Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";

import { AuthRequest } from "../../middleware/auth.middleware";

import {
  startInterviewSession,
  submitAnswer,
  endInterviewSession,
  getInterviewSession,
  getInterviewHistory,
} from "./interview.service";

import {
  validateStartInterviewRequest,
  validateSubmitAnswerRequest,
} from "./interview.validation";

// ============================================================
// START INTERVIEW SESSION
// ============================================================

export const startInterview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      throw new ApiError(401, "Authentication required");
    }

    const {
      resumeId,
      targetRole,
      jobDescription,
      preparationNotes,
      questionType,
      difficulty,
      totalQuestions,
    } = req.body;

    validateStartInterviewRequest({
      resumeId,
      targetRole,
      jobDescription,
      preparationNotes,
      questionType,
      difficulty,
      totalQuestions,
    });

    const session = await startInterviewSession(req.userId, {
      resumeId,
      targetRole,
      jobDescription,
      preparationNotes,
      questionType,
      difficulty,
      totalQuestions,
    });

    res.status(201).json({
      success: true,
      message: "Interview session started",
      data: { session },
    });
  },
);

// ============================================================
// SUBMIT ANSWER
// ============================================================

export const submitInterviewAnswer = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      throw new ApiError(401, "Authentication required");
    }

    const { sessionId, questionIndex, answerText, timeTakenSeconds } =
      req.body;

    validateSubmitAnswerRequest({
      sessionId,
      questionIndex,
      answerText,
      timeTakenSeconds,
    });

    const result = await submitAnswer(
      req.userId,
      sessionId,
      questionIndex,
      answerText,
      timeTakenSeconds,
    );

    res.status(200).json({
      success: true,
      message: "Answer submitted",
      data: result,
    });
  },
);

// ============================================================
// END SESSION EARLY
// ============================================================

export const endInterview = asyncHandler(
  async (
    req: AuthRequest<{ sessionId: string }>,
    res: Response,
  ) => {
    if (!req.userId) {
      throw new ApiError(401, "Authentication required");
    }

    const { sessionId } = req.params;

    if (!sessionId) {
      throw new ApiError(400, "sessionId is required");
    }

    const session = await endInterviewSession(req.userId, sessionId);

    res.status(200).json({
      success: true,
      message: "Interview session ended",
      data: { session },
    });
  },
);

// ============================================================
// GET SESSION
// ============================================================

export const getSession = asyncHandler(
  async (
    req: AuthRequest<{ sessionId: string }>,
    res: Response,
  ) => {
    if (!req.userId) {
      throw new ApiError(401, "Authentication required");
    }

    const { sessionId } = req.params;

    if (!sessionId) {
      throw new ApiError(400, "sessionId is required");
    }

    const session = await getInterviewSession(req.userId, sessionId);

    res.status(200).json({
      success: true,
      data: { session },
    });
  },
);

// ============================================================
// GET HISTORY
// ============================================================

export const getHistory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      throw new ApiError(401, "Authentication required");
    }

    const sessions = await getInterviewHistory(req.userId);

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  },
);
