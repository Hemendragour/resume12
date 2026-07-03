import api from "../../../api/axios";

import type { Resume } from "../types/resume.types";

export interface ShareResponse {
  success: boolean;
  message: string;
  shareId: string;
}

export const shareResume = async (
  id: string
): Promise<ShareResponse> => {
  const { data } = await api.post(
    `/resumes/${id}/share`
  );

  return data;
};

export const disableShareResume = async (
  id: string
) => {
  const { data } = await api.delete(
    `/resumes/${id}/share`
  );

  return data;
};

export const getPublicResume = async (
  shareId: string
): Promise<Resume> => {
  const { data } = await api.get(
    `/resumes/public/${shareId}`
  );

  return data.resume;
};