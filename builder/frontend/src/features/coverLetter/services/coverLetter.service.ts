import api from "../../../api/axios";

import type {
  CoverLetter,
  CreateCoverLetterRequest,
} from "../types/coverLetter.types";

/**
 * Create Cover Letter
 *
 * `data` can be just { title, targetRole, templateId } for a blank
 * manually-created letter, or can additionally include personalInfo /
 * recipient / body / closing when saving an AI-generated draft for
 * the first time.
 */
export const createCoverLetter = async (
  data: CreateCoverLetterRequest | Partial<CoverLetter>,
): Promise<CoverLetter> => {
  const response = await api.post("/cover-letters", data);

  return response.data.coverLetter;
};

/**
 * Get All Cover Letters
 */
export const getCoverLetters = async (): Promise<CoverLetter[]> => {
  const response = await api.get("/cover-letters");

  return response.data.coverLetters;
};

/**
 * Get Cover Letter By Id
 */
export const getCoverLetterById = async (
  id: string,
): Promise<CoverLetter> => {
  const response = await api.get(`/cover-letters/${id}`);

  return response.data.coverLetter;
};

/**
 * Update Cover Letter
 */
export const updateCoverLetter = async (
  id: string,
  data: Partial<CoverLetter>,
): Promise<CoverLetter> => {
  const response = await api.patch(`/cover-letters/${id}`, data);

  return response.data.coverLetter;
};

/**
 * Delete Cover Letter
 */
export const deleteCoverLetter = async (id: string): Promise<void> => {
  await api.delete(`/cover-letters/${id}`);
};
