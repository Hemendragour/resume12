import type { ResumeTemplate } from "../types/resume.types";

// import technicalClassic from "../../../assets/templates/technical_clasic.png";
// import technicalClassic from "../../../assets/templates/technical-classic.png";
import technicalDeveloper from "../../../assets/templates/technical_developer.png";
// import technicalDeveloper from "../../../assets/templates/technical-developer.png";
import modernProfessional from "../../../assets/templates/modern-professional.png";
// import minimalClean from "../../../assets/templates/MINIMALCLEAN.png";
// import minimalClean from "../../../assets/templates/minimal-clean.png";
import splitLabel from "../../../assets/templates/split-label.png";
import corporateBand from "../../../assets/templates/coporate_band.png";
// import corporateBand from "../../../assets/templates/corporate-band.png";
import classicSerif from "../../../assets/templates/clasic-serif.png";
// import classicSerif from "../../../assets/templates/classic-serif.png";
import corporateClassic from "../../../assets/templates/coporate_classic.png";
// import corporateClassic from "../../../assets/templates/corporate-classic.png";
import executiveBlue from "../../../assets/templates/executive_blue.png";
// import executiveBlue from "../../../assets/templates/executive-blue.png";
import professionalModern from "../../../assets/templates/professional_modern.png";
// import professionalModern from "../../../assets/templates/professional-modern.png";
import enhancvModern from "../../../assets/templates/enhancv-modern.png";
import harvardATS from "../../../assets/templates/harvard-ats.png";
import latexAts from "../../../assets/templates/latex-ats.png";
import latexAtsPhoto from "../../../assets/templates/latex-ats-photo.png";
import latexAtsV2 from "../../../assets/templates/latex-ats-v2.png";

export interface TemplateOption {
  id: ResumeTemplate;
  name: string;
  description: string;
  ats: string;
  featured?: boolean;
  color: string;
  image: string;
}

export const templates: TemplateOption[] = [
  {
    id: "technical-developer",
    name: "Technical Developer",
    description: "Modern Developer Resume",
    ats: "98% ATS",
    color: "bg-card",
    image: technicalDeveloper,
  },

  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Professional Business Layout",
    ats: "96% ATS",
    color: "bg-card",
    image: modernProfessional,
  },

  // {
  //   id: "minimal-clean",
  //   name: "Minimal Clean",
  //   description: "Simple ATS Friendly Resume",
  //   ats: "95% ATS",
  //   color: "bg-card",
  //   image: minimalClean,
  // },

  {
    id: "split-label",
    name: "Split Label",
    description: "Elegant label-left layout for creative & business roles",
    ats: "94% ATS",
    color: "bg-card",
    image: splitLabel,
  },
  {
    id: "enhancv-modern",
    name: "Enhancv Modern",
    description:
      "Modern professional layout inspired by Enhancv with clean ATS-friendly design",
    ats: "99% ATS",
    color: "bg-card",
    image: enhancvModern,
  },
  {
    id: "harvard-ats",
    name: "Harvard ATS",
    description:
      "Classic Harvard-style ATS-friendly resume with a clean and professional layout",
    ats: "99% ATS",
    color: "bg-card",
    image: harvardATS,
  },
  {
    id: "latex-ats",
    name: "LaTeX ATS",
    description:
      "Classic LaTeX-style ATS resume with small-caps headings, tabular subheadings, and tight serif typography",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAts,
  },
  {
    id: "latex-ats-photo",
    name: "LaTeX ATS (Photo)",
    description:
      "LaTeX-style ATS resume with a profile photo, labeled contact lines, and inline project tech stacks",
    ats: "97% ATS",
    color: "bg-card",
    image: latexAtsPhoto,
  },
  {
    id: "latex-ats-v2",
    name: "LaTeX ATS (No Photo)",
    description:
      "Same as LaTeX ATS Photo but full-width header with labeled contact lines and no profile photo",
    ats: "99% ATS",
    color: "bg-card",
    image: latexAtsV2,
  },
  {
    id: "corporate-band",
    name: "Corporate Band",
    description: "Bold header for Marketing & Corporate roles",
    ats: "97% ATS",
    color: "bg-card",
    image: corporateBand,
  },

  {
    id: "classic-serif",
    name: "Classic Serif",
    description: "Centered serif header, elegant single-column layout",
    ats: "98% ATS",
    color: "bg-card",
    image: classicSerif,
  },

  {
    id: "corporate-classic",
    name: "Corporate Classic",
    description: "Centered bordered headers, structured grid layout",
    ats: "97% ATS",
    color: "bg-card",
    image: corporateClassic,
  },

  {
    id: "executive-blue",
    name: "Executive Blue",
    description:
      "Bold blue accents, badge-style certifications, GitHub-linked projects",
    ats: "96% ATS",
    color: "bg-card",
    image: executiveBlue,
  },

  {
    id: "professional-modern",
    name: "Professional Modern",
    description: "Professional ATS Resume with Icon Sections",
    ats: "99% ATS",
    featured: true,
    color: "bg-card",
    image: professionalModern,
  },

  // {
  //   id: "technical-classic",
  //   name: "Technical Classic",
  //   description: "Best for Software Engineers & FAANG",
  //   ats: "99% ATS",
  //   featured: true,
  //   color: "bg-card",
  //   image: technicalClassic,
  // },
];
