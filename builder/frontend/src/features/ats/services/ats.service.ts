import api from "../../../api/axios";

import type {
  ATSAnalyzeRequest,
  ATSAnalyzeResponse,
  ATSHistoryResponse,
  ATSLatestResponse,
} from "../types/ats.types";

// ============================================================
// RUN ATS ANALYSIS
// ============================================================

export async function analyzeATS(
  payload: ATSAnalyzeRequest
): Promise<ATSAnalyzeResponse> {
  const { data } =
    await api.post<ATSAnalyzeResponse>(
      "/ats/analyze",
      payload
    );

  return data;
}

// ============================================================
// GET LATEST ATS ANALYSIS
// ============================================================

export async function getLatestATS(
  resumeId: string
): Promise<ATSLatestResponse> {
  const { data } =
    await api.get<ATSLatestResponse>(
      `/ats/${resumeId}/latest`
    );

  return data;
}

// ============================================================
// GET ATS ANALYSIS HISTORY
// ============================================================

export async function getATSHistory(
  resumeId: string
): Promise<ATSHistoryResponse> {
  const { data } =
    await api.get<ATSHistoryResponse>(
      `/ats/${resumeId}/history`
    );

  return data;
}