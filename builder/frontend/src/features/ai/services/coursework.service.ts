import api from "../../../api/axios";

export async function generateCoursework(
  degree: string,
  fieldOfStudy: string,
  targetRole?: string
) {
  const { data } = await api.post("/ai/coursework", {
    degree,
    fieldOfStudy,
    targetRole,
  });
  return data.coursework;
}