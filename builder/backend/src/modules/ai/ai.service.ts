// import { generateContent } from "../../providers/gemini.provider";
// import { buildSummaryPrompt } from "../../prompts/summary.prompt";

// import { buildExperiencePrompt } from "../../prompts/rewrite-experience.prompt";
// import { buildSkillsPrompt } from "../../prompts/suggest-skills.prompt";
// import { buildProjectPrompt } from "../../prompts/generate-project.prompt";

// export const generateSummaryService = async (
//   resume: any
// ) => {
//   const prompt =
//     buildSummaryPrompt(resume);

//   return generateContent(prompt);
// };

// export const rewriteExperienceService = async (
//   experience: string,
//   targetRole: string
// ) => {
//   const prompt = buildExperiencePrompt(
//     experience,
//     targetRole
//   );

//   return generateContent(prompt);
// };

// export const suggestSkillsService = async (
//   jobTitle: string
// ) => {
//   const prompt = buildSkillsPrompt(jobTitle);

//   return generateContent(prompt);
// };

// export const generateProjectService = async (
//   projectName: string,
//   technologies: string[]
// ) => {
//   const prompt = buildProjectPrompt(
//     projectName,
//     technologies
//   );

//   return generateContent(prompt);
// };

import { generateContent } from "../../providers/gemini.provider";

import { buildSummaryPrompt } from "../../prompts/summary.prompt";
import { buildExperiencePrompt } from "../../prompts/rewrite-experience.prompt";
import { buildSkillsPrompt } from "../../prompts/suggest-skills.prompt";
import { buildProjectPrompt } from "../../prompts/generate-project.prompt";

import { buildGenerateExperiencePrompt } from "../../prompts/generate-experience.prompt";
import { generateJSON } from "../../providers/gemini.provider";
import { buildProjectDescriptionPrompt } from "../../prompts/project-description.prompt";

export const generateSummaryService = async (
  resume: any
) => {
  const prompt =
    buildSummaryPrompt(resume);

  return generateContent(prompt);
};

export const rewriteExperienceService = async (
  experience: string,
  targetRole: string
) => {
  const prompt =
    buildExperiencePrompt(
      experience,
      targetRole
    );

  return generateContent(prompt);
};

export const suggestSkillsService =
async (
  resume: any
) => {
  const prompt =
    buildSkillsPrompt(
      resume
    );

  return generateJSON<string[]>(
    prompt
  );
};

export const generateProjectService = async (
  projectName: string,
  technologies: string[]
) => {
  const prompt =
    buildProjectPrompt(
      projectName,
      technologies
    );

  return generateContent(prompt);
};


export const generateExperienceService =
  async (
    company: string,
    position: string
  ) => {
    const prompt =
      buildGenerateExperiencePrompt(
        company,
        position
      );

    return generateJSON<string[]>(
      prompt
    );
  };


  export const generateProjectDescriptionService =
  async (
    projectName: string,
    technologies: string[]
  ) => {
    const prompt =
      buildProjectDescriptionPrompt(
        projectName,
        technologies
      );

    return generateContent(prompt);
  };