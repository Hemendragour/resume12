import api from "../../../api/axios";

export async function suggestSkills(payload: {
  resumeId: string;
  selectedCategory?: string;
}) {
  const { data } = await api.post("/ai/suggest-skills", payload);
  return data.skills;
}