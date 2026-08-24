import api from "../../../api/axios";

interface ProjectContext {
  whatBuilt?: string;
  problemSolved?: string;
  teamSize?: string;
  impact?: string;
}

export async function generateProjectDescription(
  projectName: string,
  technologies: string[],
  context?: ProjectContext,
) {
  const { data } = await api.post("/ai/project", {
    projectName,
    technologies,
    context,
  });
  return data.description;
}
