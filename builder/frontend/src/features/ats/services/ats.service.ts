import api from "../../../api/axios";

import type {
  ATSScoreResponse,
} from "../types/ats.types";

export async function getATSScore(
  resumeId: string
): Promise<ATSScoreResponse> {
  const { data } =
    await api.get(
      `/ats/score/${resumeId}`
    );

  return data.data;
}