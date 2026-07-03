import api from "../../../api/axios";

export async function rewriteExperience(
  experience: string,
  targetRole: string
) {
  const { data } = await api.post(
    "/ai/rewrite-experience",
    {
      experience,
      targetRole,
    }
  );

  return data.content;
}