import api from "../../../api/axios";

import type {
  InterviewSession,
  StartInterviewPayload,
  StartInterviewResult,
  SubmitAnswerPayload,
  SubmitAnswerResponse,
} from "../types/interview.types";

/**
 * Start a new interview session. Generates the first question AND its
 * audio together on the backend and returns both in one response, so
 * the frontend never has to render a question before its audio exists.
 */
export const startInterview = async (
  payload: StartInterviewPayload,
): Promise<StartInterviewResult> => {
  const response = await api.post("/interview/start", payload);

  return response.data.data;
};

/**
 * Submit an answer for the current question.
 * Returns feedback for that answer, the updated session (next question,
 * or marked completed), and - together with that next question - its
 * ready-to-play audio (null once the session has just completed).
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

/**
 * Convert question text to speech via the backend TTS service.
 * Used only as a fallback (e.g. after a page refresh) when a question
 * is displayed without its originally-bundled audio. The normal flow
 * gets audio bundled directly into the start/submit-answer responses.
 * Returns a playable audio Blob (WAV).
 */
export const synthesizeQuestionAudio = async (
  text: string,
): Promise<Blob> => {
  const response = await api.post(
    "/interview/tts",
    { text },
    { responseType: "blob" },
  );

  return response.data;
};

/**
 * Upload a recorded answer and get back its transcript via the
 * backend Speech-to-Text service.
 */
export const transcribeAnswerAudio = async (
  audioBlob: Blob,
): Promise<string> => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "answer.webm");

  const response = await api.post("/interview/transcribe", formData);

  return response.data.data.transcript;
};
