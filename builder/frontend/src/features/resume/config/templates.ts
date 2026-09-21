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
import coporateClassicFresherCloud from "../../../assets/templates/coporate-classic-fresher-cloud-1.png";
import enhanceCVFresherAi from "../../../assets/templates/enhanceCV-fresher-ai-1.png";
import executivesidebarDataAnafrom from "../../../assets/templates/executive sidebar -data analyts-1.png";
import executiveBlueExpML from "../../../assets/templates/executive-blue-exp-ml-1.png";
import latexAtsExpFullStack from "../../../assets/templates/latex-ats-exp.-full stack-1.png";
import latexAtsPhotoDevopsFresher from "../../../assets/templates/latex-ats-photo-devops-fresh-1.png";
import latexSidebarExpAi from "../../../assets/templates/latex-sidebar-exp.-ai eng-1.png";
import modernProfessionalFrontendFresher from "../../../assets/templates/modern-professional-frontend-fresh-1.png";
import splitlabelBackendFresher from "../../../assets/templates/split-label-backend-fresher-1.png";
import harvardATSFresherAi from "../../../assets/templates/hardwardATs-fresher-ai-1.png";
import latexAtsExpBackend from "../../../assets/templates/latex-ats-exp-backend-1.png";
import latexAtsExpDataScience from "../../../assets/templates/latex-ats-exp-datascience-1.png";
import latexAtsExpFrontend from "../../../assets/templates/latex-ats-exp-frontend-1.png";
import latexAtsNoPhotoExpCloud from "../../../assets/templates/latex-ats-no-photo-exp-cloud-1.png";
import modernProfessionalFresherDataAnalyst from "../../../assets/templates/modern-prof-fresh-data-analyts-1.png";

export type ExperienceLevel = "fresher" | "experienced";
export type Domain =
  | "full-stack"
  | "frontend"
  | "backend"
  | "ai"
  | "data-science"
  | "cloud";

export interface TemplateOption {
  id: ResumeTemplate;
  /**
   * Unique identifier for this specific template *variant*.
   * `id` maps to the shared React template/renderer and is intentionally
   * reused across variants (e.g. multiple "latex-ats" entries), so it must
   * NOT be used as a React list key or the filtered grid will mix up cards.
   */
  slug: string;
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
    slug: "technical-developer",
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
    slug: "enhancv-modern",
    description:
      "Modern professional layout inspired by Enhancv with clean ATS-friendly design",
    ats: "99% ATS",
    color: "bg-card",
    image: enhancvModern,
    experienceLevel: ["fresher", "experienced"],
    domain: ["full-stack"],
  },
  {
    id: "enhancv-modern",
    name: "Enhancv Modern fresher ai",
    slug: "enhancv-modern-fresher-ai",
    description:
      "Modern professional layout inspired by Enhancv with clean ATS-friendly design",
    ats: "99% ATS",
    color: "bg-card",
    image: enhanceCVFresherAi,
    experienceLevel: ["fresher"],
    domain: ["ai"],
  },
  {
    id: "harvard-ats",
    name: "Harvard ATS",
    slug: "harvard-ats",
    description:
      "Classic Harvard-style ATS-friendly resume with a clean and professional layout",
    ats: "99% ATS",
    color: "bg-card",
    image: harvardATS,
    experienceLevel: ["fresher"],
    domain: ["frontend"],
  },
  {
    id: "harvard-ats",
    name: "Harvard ATS fresher ai",
    slug: "harvard-ats-fresher-ai",
    description:
      "Classic Harvard-style ATS-friendly resume with a clean and professional layout",
    ats: "99% ATS",
    color: "bg-card",
    image: harvardATSFresherAi,
    experienceLevel: ["fresher"],
    domain: ["ai"],
  },
  {
    id: "latex-ats",
    name: "LaTeX ATS",
    slug: "latex-ats",
    description:
      "Classic LaTeX-style ATS resume with small-caps headings, tabular subheadings, and tight serif typography",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAts,
    experienceLevel: ["experienced"],
    domain: ["ai"],
  },
  {
    id: "latex-ats",
    name: "LaTeX ATS full stack exp",
    slug: "latex-ats-full-stack-exp",
    description:
      "Classic LaTeX-style ATS resume with small-caps headings, tabular subheadings, and tight serif typography",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsExpFullStack,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },
  {
    id: "latex-ats",
    name: "LaTeX ATS backend exp",
    slug: "latex-ats-backend-exp",
    description:
      "Classic LaTeX-style ATS resume with small-caps headings, tabular subheadings, and tight serif typography",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsExpBackend,
    experienceLevel: ["experienced"],
    domain: ["backend"],
  },
  {
    id: "latex-ats",
    name: "LaTeX ATS data science exp",
    slug: "latex-ats-data-science-exp",
    description:
      "Classic LaTeX-style ATS resume with small-caps headings, tabular subheadings, and tight serif typography",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsExpDataScience,
    experienceLevel: ["experienced"],
    domain: ["data-science"],
  },
  {
    id: "latex-ats",
    name: "LaTeX ATS frontend exp",
    slug: "latex-ats-frontend-exp",
    description:
      "Classic LaTeX-style ATS resume with small-caps headings, tabular subheadings, and tight serif typography",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsExpFrontend,
    experienceLevel: ["experienced"],
    domain: ["frontend"],
  },
  {
    id: "latex-ats-photo",
    name: "LaTeX ATS (Photo)",
    slug: "latex-ats-photo",
    description:
      "LaTeX-style ATS resume with a profile photo, labeled contact lines, and inline project tech stacks",
    ats: "97% ATS",
    color: "bg-card",
    image: latexAtsPhoto,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },
  {
    id: "latex-ats-photo",
    name: "LaTeX ATS (Photo) devops fresher",
    slug: "latex-ats-photo-devops-fresher",
    description:
      "LaTeX-style ATS resume with a profile photo, labeled contact lines, and inline project tech stacks",
    ats: "97% ATS",
    color: "bg-card",
    image: latexAtsPhotoDevopsFresher,
    experienceLevel: ["fresher"],
    domain: ["cloud"],
  },
  {
    id: "latex-ats-v2",
    name: "LaTeX ATS (No Photo)",
    slug: "latex-ats-no-photo",
    description:
      "Same as LaTeX ATS Photo but full-width header with labeled contact lines and no profile photo",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsV2,
    experienceLevel: ["experienced"],
    domain: ["ai"],
  },
  {
    id: "latex-ats-v2",
    name: "LaTeX ATS (No Photo) cloud exp",
    slug: "latex-ats-no-photo-cloud-exp",
    description:
      "Same as LaTeX ATS Photo but full-width header with labeled contact lines and no profile photo",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsNoPhotoExpCloud,
    experienceLevel: ["experienced"],
    domain: ["cloud"],
  },
  {
    id: "executive-sidebar",
    name: "Executive Sidebar",
    slug: "executive-sidebar",
    description:
      "One-page sidebar resume with photo, contact, skills and languages on the left; a navy highlight bar for name/profession only, plain dates and clean white body on the right",
    ats: "92% ATS",
    color: "bg-card",
    image: executiveSidebar,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },
  {
    id: "executive-sidebar",
    name: "Executive Sidebar data analyts",
    slug: "executive-sidebar-data-analyts",
    description:
      "One-page sidebar resume with photo, contact, skills and languages on the left; a navy highlight bar for name/profession only, plain dates and clean white body on the right",
    ats: "92% ATS",
    color: "bg-card",
    image: executivesidebarDataAnafrom,
    experienceLevel: ["fresher"],
    domain: ["data-science"],
  },
  {
    id: "latex-sidebar",
    name: "LaTeX Sidebar",
    slug: "latex-sidebar",
    description:
      "Two-column sidebar resume inspired by LaTeX — light sidebar for personal info, skills, languages & certificates; clean white main panel for experience, education and projects",
    ats: "95% ATS",
    color: "bg-card",
    image: latexSidebar,
    experienceLevel: ["fresher"],
    domain: ["full-stack"],
  },
  {
    id: "latex-sidebar",
    name: "LaTeX Sidebar experience ai",
    slug: "latex-sidebar-experience-ai",
    description:
      "Two-column sidebar resume inspired by LaTeX — light sidebar for personal info, skills, languages & certificates; clean white main panel for experience, education and projects",
    ats: "95% ATS",
    color: "bg-card",
    image: latexSidebarExpAi,
    experienceLevel: ["experienced"],
    domain: ["ai"],
  },
  {
    id: "corporate-band",
    name: "Corporate Band",
    slug: "corporate-band",
    description: "Bold header for Marketing & Corporate roles",
    ats: "97% ATS",
    color: "bg-card",
    image: corporateBand,
    experienceLevel: ["fresher"],
    domain: ["backend"],
  },

  {
    id: "classic-serif",
    name: "Classic Serif",
    slug: "classic-serif",
    description: "Centered serif header, elegant single-column layout",
    ats: "98% ATS",
    color: "bg-card",
    image: ClassicSerif,
    experienceLevel: ["fresher"],
    domain: ["frontend"],
  },

  {
    id: "corporate-classic",
    name: "Corporate Classic",
    slug: "corporate-classic",
    description: "Centered bordered headers, structured grid layout",
    ats: "97% ATS",
    color: "bg-card",
    image: corporateClassic,
    experienceLevel: ["experienced"],
    domain: ["ai"],
  },
  {
    id: "corporate-classic",
    name: "Corporate Classic fresher could",
    slug: "corporate-classic-fresher-could",
    description: "Centered bordered headers, structured grid layout",
    ats: "97% ATS",
    color: "bg-card",
    image: coporateClassicFresherCloud,
    experienceLevel: ["fresher"],
    domain: ["cloud"],
  },

  {
    id: "executive-blue",
    name: "Executive Blue",
    slug: "executive-blue",
    description:
      "Bold blue accents, badge-style certifications, GitHub-linked projects",
    ats: "96% ATS",
    color: "bg-card",
    image: executiveBlue,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },
  {
    id: "executive-blue",
    name: "Executive Blue exp ml",
    slug: "executive-blue-exp-ml",
    description:
      "Bold blue accents, badge-style certifications, GitHub-linked projects",
    ats: "96% ATS",
    color: "bg-card",
    image: executiveBlueExpML,
    experienceLevel: ["experienced"],
    domain: ["ai"],
  },

  {
    id: "professional-modern",
    name: "Professional Modern",
    slug: "professional-modern",
    description: "Professional ATS Resume with Icon Sections",
    ats: "99% ATS",
    featured: true,
    color: "bg-card",
    image: professionalModern,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    slug: "modern-professional",
    description: "Professional Business Layout",
    ats: "96% ATS",
    color: "bg-card",
    image: modernProfessional,
    experienceLevel: ["experienced"],
    domain: ["full-stack"],
  },
  {
    id: "modern-professional",
    name: "Modern Professional frontend fresher",
    slug: "modern-professional-frontend-fresher",
    description: "Professional Business Layout",
    ats: "96% ATS",
    color: "bg-card",
    image: modernProfessionalFrontendFresher,
    experienceLevel: ["fresher"],
    domain: ["frontend"],
  },
  {
    id: "modern-professional",
    name: "Modern Professional fresher data analyst",
    slug: "modern-professional-fresher-data-analyst",
    description: "Professional Business Layout",
    ats: "96% ATS",
    color: "bg-card",
    image: modernProfessionalFresherDataAnalyst,
    experienceLevel: ["fresher"],
    domain: ["data-science"],
  },

  {
    id: "split-label",
    name: "Split Label",
    slug: "split-label",
    description: "Elegant label-left layout for creative & business roles",
    ats: "94% ATS",
    color: "bg-card",
    image: splitLabel,
    experienceLevel: ["fresher"],
    domain: ["full-stack"],
  },
  {
    id: "split-label",
    name: "Split Label backend frehser",
    slug: "split-label-backend-frehser",
    description: "Elegant label-left layout for creative & business roles",
    ats: "94% ATS",
    color: "bg-card",
    image: splitlabelBackendFresher,
    experienceLevel: ["fresher"],
    domain: ["backend"],
  },
];
