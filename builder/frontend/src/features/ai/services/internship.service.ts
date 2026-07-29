import api from "../../../api/axios";

interface InternshipContext {
  whatDone?: string;
  toolsUsed?: string;
  mentorTeam?: string;
  result?: string;
}

export async function generateInternshipDescription(
  company: string,
  role: string,
  context?: InternshipContext
) {
  const { data } = await api.post("/ai/internship", {
    company,
    role,
    context,
  });
  return data.description;
}