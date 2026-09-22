import api from "../../../api/axios";

import type {
  CoverLetter,
  RegenerateCoverLetterTarget,
} from "../types/coverLetter.types";

export type GeneratedCoverLetterContent = Pick<
  CoverLetter,
  "personalInfo" | "recipient" | "body" | "closing"
>;

export interface GenerateCoverLetterParams {
  targetRole: string;
  jobDescription?: string;
  companyName?: string;
  companyInfo?: string;
  resumeId?: string;
  resumeFile?: File | null;
}

/**
 * Generate a cover letter with AI.
 *
 * Always sent as multipart form data (even when no file is attached) so
 * the backend's single upload-parsing middleware can handle both cases
 * consistently. The Content-Type header (with boundary) is left for the
 * browser/axios to set automatically — never set it manually with FormData.
 */
export const generateCoverLetterWithAI = async (
  params: GenerateCoverLetterParams,
): Promise<GeneratedCoverLetterContent> => {
  const formData = new FormData();

  formData.append("targetRole", params.targetRole);

  if (params.jobDescription) {
    formData.append("jobDescription", params.jobDescription);
  }

  if (params.companyName) {
    formData.append("companyName", params.companyName);
  }

  if (params.companyInfo) {
    formData.append("companyInfo", params.companyInfo);
  }

  if (params.resumeId) {
    formData.append("resumeId", params.resumeId);
  }

  if (params.resumeFile) {
    formData.append("file", params.resumeFile);
  }

  const response = await api.post("/ai/generate-cover-letter", formData, {
    timeout: 120000,
  });

  return response.data.coverLetter;
};

export interface RegenerateCoverLetterParams {
  currentLetter: CoverLetter;
  target: RegenerateCoverLetterTarget;
  reason: string;
}

export const regenerateCoverLetterSection = async (
  params: RegenerateCoverLetterParams,
): Promise<Record<string, unknown>> => {
  const response = await api.post("/ai/regenerate-cover-letter", params);

  return response.data.result;
};
