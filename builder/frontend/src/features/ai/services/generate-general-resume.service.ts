import api from "../../../api/axios";

/**
 * Shape collected by QuickGenerateForm. Text-array fields are entered as
 * newline/comma separated strings in the UI and split into arrays before
 * being sent to the backend.
 */
export interface QuickGenerateFormData {
  jobDescription?: string;
  summary?: string;
  summaryInstruction?: string;
  personalInfo: {
    fullName: string;
    title?: string;
    email: string;
    phone?: string;
    address?: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };
  skills: { title: string; skillsText: string }[];
  skillsInstruction?: string;
  experience: {
    company: string;
    position: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking?: boolean;
    location?: string;
    technologies?: string;
    responsibilitiesText?: string;
    achievementsText?: string;
  }[];
  experienceInstruction?: string;
  internships: {
    company: string;
    role: string;
    startDate?: string;
    endDate?: string;
    currentlyInterning?: boolean;
    responsibilitiesText?: string; // one per line
    achievementsText?: string; // one per line
  }[];
  internshipsInstruction?: string;
  education: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;

    startYear?: string;

    endYear?: string;
    cgpa?: string;
    coursework?: string;
  }[];
  projects: {
    title: string;
    role?: string;
    technologies?: string; // comma separated
    descriptionText?: string; // one bullet per line
    github?: string;
    link?: string;
  }[];
  projectsInstruction?: string;
  languages: { name: string; level: string }[];
  certifications?: string; // one per line
  achievements?: string; // one per line
  achievementsInstruction?: string;
}

// Raw shape returned by the AI (matches backend prompt's JSON contract)
export interface GeneratedResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  skills: { title: string; skills: string[] }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    responsibilities: string[];
    achievements: string[];
    location: string;
    technologies: string[];
  }[];
  internships: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    currentlyInterning: boolean;
    responsibilities: string[];
    achievements: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;

    startYear: number;

    endYear: number;
    cgpa: string;
    coursework: string;
  }[];
  projects: {
    title: string;
    role: string;
    description: string[];
    technologies: string[];
    github: string;
    link: string;
  }[];
  certifications: string[];
  languages: { name: string; level: string }[];
  achievements: string[];
}

const toLines = (text?: string) =>
  (text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const toCsv = (text?: string) =>
  (text || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

/**
 * Turns the quick-generate form's values into the raw structured object
 * the backend's generate-general-resume prompt expects — the same shape
 * as a finished resume, just unpolished/incomplete. The AI fills gaps,
 * fixes grammar, and (if a JD is present) tailors wording — it never
 * invents facts.
 */
function buildRawFormData(form: QuickGenerateFormData) {
  return {
    jobDescription: form.jobDescription || "",
    personalInfo: form.personalInfo,
    summary: form.summary || "",
    summaryInstruction: form.summaryInstruction || "",
    skills: (form.skills || [])
      .filter((s) => s.title?.trim() || s.skillsText?.trim())
      .map((s) => ({
        title: s.title,
        skills: toCsv(s.skillsText),
      })),
    skillsInstruction: form.skillsInstruction || "",
    experience: (form.experience || [])
      .filter((e) => e.company?.trim() || e.position?.trim())
      .map((e) => ({
        company: e.company,
        position: e.position,
        startDate: e.startDate || "",
        endDate: e.endDate || "",
        currentlyWorking: e.currentlyWorking || false,
        location: e.location || "",
        technologies: toCsv(e.technologies),
        responsibilities: toLines(e.responsibilitiesText),
        achievements: toLines(e.achievementsText),
      })),
    experienceInstruction: form.experienceInstruction || "",
    internships: (form.internships || [])
      .filter((i) => i.company?.trim() || i.role?.trim())
      .map((i) => ({
        company: i.company,
        role: i.role,
        startDate: i.startDate || "",
        endDate: i.endDate || "",
        currentlyInterning: i.currentlyInterning || false,
        responsibilities: toLines(i.responsibilitiesText),
        achievements: toLines(i.achievementsText),
      })),
    internshipsInstruction: form.internshipsInstruction || "",
    education: (form.education || [])
      .filter((edu) => edu.institution?.trim() || edu.degree?.trim())
      .map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy || "",

        startYear: Number(edu.startYear) || 0,

        endYear: Number(edu.endYear) || 0,
        cgpa: edu.cgpa || "",
        coursework: edu.coursework || "",
      })),

    projects: (form.projects || [])
      .filter((p) => p.title?.trim())
      .map((p) => ({
        title: p.title,
        role: p.role || "",
        description: toLines(p.descriptionText),
        technologies: toCsv(p.technologies),
        github: p.github || "",
        link: p.link || "",
      })),
    projectsInstruction: form.projectsInstruction || "",
    certifications: toLines(form.certifications),
    languages: (form.languages || []).filter(
      (l) => l.name?.trim() || l.level?.trim(),
    ),
    achievements: toLines(form.achievements),
    achievementsInstruction: form.achievementsInstruction || "",
  };
}

export async function generateFullResume(
  formData: QuickGenerateFormData,
): Promise<GeneratedResumeData> {
  const { data } = await api.post("/ai/generate-resume", {
    formData: buildRawFormData(formData),
  });
  return data.resume;
}
