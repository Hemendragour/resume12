import api from "../../../api/axios";

import type {
  InterviewSession,
  StartInterviewPayload,
  SubmitAnswerPayload,
  SubmitAnswerResponse,
} from "../types/interview.types";

/**
 * Start a new interview session — generates and returns the first question.
 */
export const startInterview = async (
  payload: StartInterviewPayload,
): Promise<InterviewSession> => {
  const response = await api.post("/interview/start", payload);

  return response.data.data.session;
};

/**
 * Submit an answer for the current question.
 * Returns feedback for that answer, plus the updated session
 * (which will contain the next question, or be marked completed).
 */
export const submitInterviewAnswer = async (
  payload: SubmitAnswerPayload,
): Promise<SubmitAnswerResponse> => {
  const response = await api.post("/interview/submit-answer", payload);

  return response.data.data;
};

/**
 * End a session early.
 */
export const endInterviewSession = async (
  sessionId: string,
): Promise<InterviewSession> => {
  const response = await api.post(`/interview/${sessionId}/end`);

  return response.data.data.session;
};

/**
 * Fetch a single session (e.g. on page refresh).
 */
export const getInterviewSession = async (
  sessionId: string,
): Promise<InterviewSession> => {
  const response = await api.get(`/interview/${sessionId}`);

  return response.data.data.session;
};

/**
 * Fetch past interview sessions for the history view.
 */
export const getInterviewHistory = async (): Promise<InterviewSession[]> => {
  const response = await api.get("/interview/history");

  return response.data.data;
};
