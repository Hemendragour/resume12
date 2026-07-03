import api from "../../../api/axios";

export const getResumeAnalytics =
  async (resumeId: string) => {
    const { data } = await api.get(
      `/analytics/resume/${resumeId}`
    );

    return data.analytics;
  };