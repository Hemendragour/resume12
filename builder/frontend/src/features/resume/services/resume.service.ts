import api from "../../../api/axios";

import type {
  Resume,
  CreateResumeRequest,
} from "../types/resume.types";

/**
 * Create Resume
 */
export const createResume = async (
  data: CreateResumeRequest
): Promise<Resume> => {
  const response = await api.post(
    "/resumes",
    data
  );

  return response.data.resume;
};

/**
 * Get Resume By Id
 */
export const getResumeById = async (
  id: string
): Promise<Resume> => {
  const response = await api.get(
    `/resumes/${id}`
  );

  return response.data.resume;
};

/**
 * Update Resume
 */
export const updateResume = async (
  id: string,
  data: unknown
): Promise<Resume> => {
  const response = await api.patch(
    `/resumes/${id}`,
    data
  );

  return response.data.resume;
};

/**
 * Get All Resumes
 */
export const getResumes = async (): Promise<Resume[]> => {
  const response = await api.get("/resumes");

  return response.data.resumes;
};


/**
 * Rename Resume
 */
export const renameResume = async (
  id: string,
  title: string
): Promise<Resume> => {
  const response = await api.patch(
    `/resumes/${id}`,
    {
      title,
    }
  );

  return response.data.resume;
};

/**
 * Delete Resume
 */
export const deleteResume = async (
  id: string
) => {
  await api.delete(
    `/resumes/${id}`
  );
};

/**
 * Duplicate Resume
 */
export const duplicateResume =
  async (
    id: string
  ): Promise<Resume> => {
    const response =
      await api.post(
        `/resumes/${id}/duplicate`
      );

    return response.data.resume;
  };