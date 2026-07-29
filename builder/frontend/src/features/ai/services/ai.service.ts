 

import api from "../../../api/axios";

export async function generateSummary(
  resumeId: string
) {
  const { data } = await api.post(
    "/ai/summary",
    {
      resumeId,
    }
  );

  return data.summary;
}