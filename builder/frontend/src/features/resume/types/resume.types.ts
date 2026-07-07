export const ResumeTemplates = {
  TECHNICAL_DEVELOPER: "technical-developer",
  MODERN_PROFESSIONAL: "modern-professional",
  MINIMAL_CLEAN: "minimal-clean",
  EXECUTIVE: "executive",
  STUDENT: "student",
  ATS: "ats",
  CREATIVE: "creative",
  CLASSIC: "classic",
  CORPORATE: "corporate",
} as const;

export type ResumeTemplate =
  typeof ResumeTemplates[keyof typeof ResumeTemplates];


export interface CreateResumeRequest {
  title: string;
  targetRole: string;
  templateId: ResumeTemplate;
 
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  photo?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string[];
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startYear: number;
  endYear?: number;
  cgpa?: string;
}

export interface Project {
  title: string;

  role?: string;

  startDate: string;

  endDate?: string;

  currentlyWorking?: boolean;

  description: string;

  technologies: string[];

  github?: string;

  link?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  type: "custom";
  title: string;
  enabled: boolean;
  order: number;
  items: CustomSectionItem[];
}

export interface Resume {
  _id: string;
  title: string;
  version: number;
  status: "draft" | "completed";
  targetRole: string;
templateId: ResumeTemplate;
sections: ResumeSection[];
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];     // string[] hi hai
  languages: string[];
  awards: string[];             // string[] hi hai
  interests: string[];
  customSections: CustomSection[];
  createdAt: string;
  updatedAt: string;
}


export interface ResumeSection {
  id: string;

  type:
    | "personalInfo"
    | "summary"
    | "experience"
    | "education"
    | "skills"
    | "projects"
    | "languages"
    | "certifications"
    | "awards"
    | "interests"
    | "custom";

  title: string;

  enabled: boolean;

  order: number;
}