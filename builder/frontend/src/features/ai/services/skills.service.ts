import api from "../../../api/axios";

export async function suggestSkills(
  resumeId: string
) {
  const { data } =
    await api.post(
      "/ai/suggest-skills",
      {
        resumeId,
      }
    );

  return data.skills;
}