export type QuestionType = "technical" | "hr" | "behavioral" | "mixed";
export type Difficulty = "easy" | "medium" | "hard";
export type QuestionCount = 5 | 10 | 15;

export interface StartInterviewPayload {
  resumeId: string;
  targetRole: string;
  jobDescription?: string;
  preparationNotes?: string;
  questionType: QuestionType;
  difficulty: Difficulty;
  totalQuestions: QuestionCount;
}

export interface InterviewFeedback {
  strengths: string[];
  improvements: string[];
  clarity: number;
  structure: number;
  technicalAccuracy: number;
  overallScore: number;
  comment: string;
}

export interface InterviewQuestion {
  index: number;
  question: string;
  isFollowUp: boolean;
  answerText: string;
  timeTakenSeconds?: number;
  feedback?: InterviewFeedback;
  answeredAt?: string;
}

export type InterviewSessionStatus =
  | "in_progress"
  | "completed"
  | "ended_early";

export interface InterviewSummary {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  comment: string;
}

export interface InterviewSession {
  _id: string;
  userId: string;
  resumeId: string;
  targetRole: string;
  jobDescription: string;
  preparationNotes: string;
  questionType: QuestionType;
  difficulty: Difficulty;
  totalQuestions: number;
  questions: InterviewQuestion[];
  status: InterviewSessionStatus;
  summary?: InterviewSummary;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitAnswerPayload {
  sessionId: string;
  questionIndex: number;
  answerText: string;
  timeTakenSeconds?: number;
}

export interface QuestionAudio {
  mimeType: string;
  base64: string;
}

export interface StartInterviewResult {
  session: InterviewSession;
  audio: QuestionAudio;
}

export interface SubmitAnswerResponse {
  feedback: InterviewFeedback;
  session: InterviewSession;
  // null once the session has just completed - there is no next question.
  audio: QuestionAudio | null;
}
