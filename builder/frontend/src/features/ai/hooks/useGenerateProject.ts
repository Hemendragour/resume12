import { useMutation } from "@tanstack/react-query";
import { generateProjectDescription } from "../services/project.service";

interface ProjectContext {
  whatBuilt?: string;
  problemSolved?: string;
  teamSize?: string;
  impact?: string;
}

export function useGenerateProject() {
  return useMutation({
    mutationFn: ({
      projectName,
      technologies,
      context,
    }: {
      projectName: string;
      technologies: string[];
      context?: ProjectContext;
    }) => generateProjectDescription(projectName, technologies, context),
  });
}