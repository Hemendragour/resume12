import type { GeneratedResumeData } from "../../../ai/services/generate-general-resume.service";
import type { Resume } from "../../types/resume.types";

/**
 * Merge AI-generated resume data into the current resume.
 * Anything the AI doesn't produce (templateId, sections, customSections,
 * awards, interests, strengths, targetRole, title, status, ...) is preserved
 * from the existing resume untouched.
 */
export function mapGeneratedResumeToResume(
  current: Resume,
  generated: GeneratedResumeData,
): Resume {
  return {
    ...current,

    personalInfo: {
      ...current.personalInfo,
      ...generated.personalInfo,
    },

    summary: generated.summary || current.summary,

    skills: generated.skills?.length ? generated.skills : current.skills,

    experience: generated.experience?.length
      ? generated.experience
      : current.experience,

    internships: generated.internships?.length
      ? generated.internships
      : current.internships,

    education: generated.education?.length
      ? generated.education.map((edu) => ({
          ...edu,
          fieldOfStudy: edu.fieldOfStudy ?? "",
        }))
      : current.education,

    projects: generated.projects?.length
      ? generated.projects.map((project) => ({
          title: project.title,
          role: project.role,
          startDate: "",
          description: project.description,
          technologies: project.technologies,
          github: project.github,
          link: project.link,
        }))
      : current.projects,

    certifications: generated.certifications?.length
      ? generated.certifications
      : current.certifications,

    languages: generated.languages?.length
      ? generated.languages
      : current.languages,

    achievements: generated.achievements?.length
      ? generated.achievements
      : current.achievements,
  };
}
