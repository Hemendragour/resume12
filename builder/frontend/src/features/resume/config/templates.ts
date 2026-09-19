import type { ResumeTemplate } from "../types/resume.types";

import technicalDeveloper from "../../../assets/templates/technical developer.png";
import modernProfessional from "../../../assets/templates/modern-professional.png";
import splitLabel from "../../../assets/templates/split-label.png";
import corporateBand from "../../../assets/templates/coporate band.png";
import corporateClassic from "../../../assets/templates/coporate-classic-1.png";
import executiveBlue from "../../../assets/templates/executive_blue.png";
import professionalModern from "../../../assets/templates/professional modern.png";
import enhancvModern from "../../../assets/templates/enhancv-modern.png";
import harvardATS from "../../../assets/templates/hardwardAts-1.png";
import latexAts from "../../../assets/templates/latexAts-1.png";
import latexAtsPhoto from "../../../assets/templates/latexAtsPhoto-1.png";
import latexAtsV2 from "../../../assets/templates/latex-ats-nophoto.png";
import executiveSidebar from "../../../assets/templates/executive_sideBar-1.png";
import latexSidebar from "../../../assets/templates/latex-sidebar-1.png";
import ClassicSerif from "../../../assets/templates/clasic-serif.png";

export type ExperienceLevel = "fresher" | "experienced";
export type Domain =
  | "full-stack"
  | "frontend"
  | "backend"
  | "ai"
  | "data-science";

export interface TemplateOption {
  id: ResumeTemplate;
  name: string;
  description: string;
  ats: string;
  featured?: boolean;
  color: string;
  image: string;
  experienceLevel: ExperienceLevel[];
  domain: Domain[];
}

export const templates: TemplateOption[] = [
  {
    id: "technical-developer",
    name: "Technical Developer",
    description: "Modern Developer Resume",
    ats: "98% ATS",
    color: "bg-card",
    image: technicalDeveloper,
    experienceLevel: ["fresher"],
    domain: ["full-stack"],
  },

  {
    id: "enhancv-modern",
    name: "Enhancv Modern",
    description:
      "Modern professional layout inspired by Enhancv with clean ATS-friendly design",
    ats: "99% ATS",
    color: "bg-card",
    image: enhancvModern,
    experienceLevel: ["fresher", "experienced"],
    domain: ["full-stack"],
  },
  {
    id: "harvard-ats",
    name: "Harvard ATS",
    description:
      "Classic Harvard-style ATS-friendly resume with a clean and professional layout",
    ats: "99% ATS",
    color: "bg-card",
    image: harvardATS,
    experienceLevel: ["fresher"],
    domain: ["data-science"],
  },
  {
    id: "latex-ats",
    name: "LaTeX ATS",
    description:
      "Classic LaTeX-style ATS resume with small-caps headings, tabular subheadings, and tight serif typography",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAts,
    experienceLevel: ["fresher"],
    domain: ["ai"],
  },
  {
    id: "latex-ats-photo",
    name: "LaTeX ATS (Photo)",
    description:
      "LaTeX-style ATS resume with a profile photo, labeled contact lines, and inline project tech stacks",
    ats: "97% ATS",
    color: "bg-card",
    image: latexAtsPhoto,
    experienceLevel: ["fresher"],
    domain: ["ai"],
  },
  {
    id: "latex-ats-v2",
    name: "LaTeX ATS (No Photo)",
    description:
      "Same as LaTeX ATS Photo but full-width header with labeled contact lines and no profile photo",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsV2,
    experienceLevel: ["fresher", "experienced"],
    domain: ["data-science"],
  },
  {
    id: "executive-sidebar",
    name: "Executive Sidebar",
    description:
      "One-page sidebar resume with photo, contact, skills and languages on the left; a navy highlight bar for name/profession only, plain dates and clean white body on the right",
    ats: "92% ATS",
    color: "bg-card",
    image: executiveSidebar,
    experienceLevel: ["experienced"],
    domain: ["backend"],
  },
  {
    id: "latex-sidebar",
    name: "LaTeX Sidebar",
    description:
      "Two-column sidebar resume inspired by LaTeX — light sidebar for personal info, skills, languages & certificates; clean white main panel for experience, education and projects",
    ats: "95% ATS",
    color: "bg-card",
    image: latexSidebar,
    experienceLevel: ["experienced"],
    domain: ["backend"],
  },
  {
    id: "corporate-band",
    name: "Corporate Band",
    description: "Bold header for Marketing & Corporate roles",
    ats: "97% ATS",
    color: "bg-card",
    image: corporateBand,
    experienceLevel: ["experienced"],
    domain: ["frontend"],
  },

  {
    id: "classic-serif",
    name: "Classic Serif",
    description: "Centered serif header, elegant single-column layout",
    ats: "98% ATS",
    color: "bg-card",
    image: ClassicSerif,
    experienceLevel: ["fresher", "experienced"],
    domain: ["data-science"],
  },

  {
    id: "corporate-classic",
    name: "Corporate Classic",
    description: "Centered bordered headers, structured grid layout",
    ats: "97% ATS",
    color: "bg-card",
    image: corporateClassic,
    experienceLevel: ["experienced"],
    domain: ["backend"],
  },

  {
    id: "executive-blue",
    name: "Executive Blue",
    description:
      "Bold blue accents, badge-style certifications, GitHub-linked projects",
    ats: "96% ATS",
    color: "bg-card",
    image: executiveBlue,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },

  {
    id: "professional-modern",
    name: "Professional Modern",
    description: "Professional ATS Resume with Icon Sections",
    ats: "99% ATS",
    featured: true,
    color: "bg-card",
    image: professionalModern,
    experienceLevel: ["fresher", "experienced"],
    domain: ["backend"],
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Professional Business Layout",
    ats: "96% ATS",
    color: "bg-card",
    image: modernProfessional,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },

  {
    id: "split-label",
    name: "Split Label",
    description: "Elegant label-left layout for creative & business roles",
    ats: "94% ATS",
    color: "bg-card",
    image: splitLabel,
    experienceLevel: ["fresher"],
    domain: ["frontend"],
  },
];
