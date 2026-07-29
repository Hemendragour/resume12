import api from "../../../api/axios";

interface ExperienceContext {
  workedOn?: string;
  technologies?: string;
  scope?: string;
  impact?: string;
}

export async function generateExperience(
  company: string,
  position: string,
  context?: ExperienceContext
) {
  const { data } = await api.post("/ai/experience", {
    company,
    position,
    context,
  });
  return data.responsibilities;
}