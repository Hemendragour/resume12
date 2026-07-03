// import api from "../../../api/axios";

// import type {
//   GenerateSummaryRequest,
//   GenerateSummaryResponse,
// } from "../types/ai.types";

// export async function generateSummary(
//   payload: GenerateSummaryRequest
// ): Promise<GenerateSummaryResponse> {
//   const { data } = await api.post(
//     "/ai/summary",
//     payload
//   );

//   return data;
// }

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