import type { Resume } from "../../types/resume.types";
import type { QuickGenerateFormData } from "../../../ai/services/generate-general-resume.service";

/**
 * Turns the current resume back into QuickGenerateFormData so the
 * "Edit with AI" flow can re-open the form pre-filled with what's
 * already there.
 */
export function mapResumeToQuickGenerateFormData(
  resume: Resume,
): QuickGenerateFormData {
  return {
    jobDescription: "",
    summary: resume.summary || "",
    summaryInstruction: "",

    personalInfo: {
      fullName: resume.personalInfo?.fullName || "",
      title: resume.personalInfo?.title || "",
      email: resume.personalInfo?.email || "",
      phone: resume.personalInfo?.phone || "",
      address: resume.personalInfo?.address || "",
      linkedIn: resume.personalInfo?.linkedIn || "",
      github: resume.personalInfo?.github || "",
      portfolio: resume.personalInfo?.portfolio || "",
    },

    skills: resume.skills?.length
      ? resume.skills.map((s) => ({
          title: s.title,
          skillsText: (s.skills || []).join(", "),
        }))
      : [{ title: "", skillsText: "" }],
    skillsInstruction: "",
    experienceInstruction: "",
    internshipsInstruction: "",
    projectsInstruction: "",
    achievementsInstruction: "",
    experience: (resume.experience || []).map((e) => ({
      company: e.company,
      position: e.position,
      startDate: e.startDate || "",
      endDate: e.endDate || "",
      currentlyWorking: e.currentlyWorking || false,
      location: e.location || "",
      responsibilitiesText: (e.responsibilities || []).join("\n"),
      achievementsText: (e.achievements || []).join("\n"),
    })),

    internships: (resume.internships || []).map((i) => ({
      company: i.company,
      role: i.role,
      startDate: i.startDate || "",
      endDate: i.endDate || "",
      currentlyInterning: i.currentlyInterning || false,
      responsibilitiesText: (i.responsibilities || []).join("\n"),
      achievementsText: (i.achievements || []).join("\n"),
    })),

    education: resume.education?.length
      ? resume.education.map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy || "",
          startYear: edu.startYear ? String(edu.startYear) : "",
          endYear: edu.endYear ? String(edu.endYear) : "",
          cgpa: edu.cgpa || "",
        }))
      : [{ institution: "", degree: "" }],

    projects: resume.projects?.length
      ? resume.projects.map((p) => ({
          title: p.title,
          role: p.role || "",
          technologies: (p.technologies || []).join(", "),
          descriptionText: (p.description || []).join("\n"),
          github: p.github || "",
          link: p.link || "",
        }))
      : [{ title: "", technologies: "", descriptionText: "" }],

    languages: resume.languages || [],

    certifications: (resume.certifications || []).join("\n"),
    achievements: (resume.achievements || []).join("\n"),
  };
}
