import api from "../../../api/axios";

export async function generateExperience(
  company: string,
  position: string
) {
  const { data } =
    await api.post(
      "/ai/experience",
      {
        company,
        position,
      }
    );

  return data.responsibilities;
}