 

import type { ResumeTemplate } from "../types/resume.types";

import technicalClassic from "../../../assets/templates/technical-classic.png";
import technicalDeveloper from "../../../assets/templates/technical-developer.png";
import modernProfessional from "../../../assets/templates/modern-professional.png";
import minimalClean from "../../../assets/templates/minimal-clean.png";
import splitLabel from "../../../assets/templates/split-label.png";
import corporateBand from "../../../assets/templates/corporate-band.png";
import classicSerif from "../../../assets/templates/classic-serif.png";
import corporateClassic from "../../../assets/templates/corporate-classic.png";
import executiveBlue from "../../../assets/templates/executive-blue.png";
import professionalModern from "../../../assets/templates/professional-modern.png";
import enhancvModern from "../../../assets/templates/enhancv-modern.png";
import harvardATS from "../../../assets/templates/harvard-ats.png";

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
    id: "technical-classic",
    name: "Technical Classic",
    description: "Best for Software Engineers & FAANG",
    ats: "99% ATS",
    featured: true,
    color: "bg-slate-100",
    image: technicalClassic,
  },

  {
    id: "technical-developer",
    name: "Technical Developer",
    description: "Modern Developer Resume",
    ats: "98% ATS",
    color: "bg-slate-100",
    image: technicalDeveloper,
  },

  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Professional Business Layout",
    ats: "96% ATS",
    color: "bg-blue-50",
    image: modernProfessional,
  },

  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Simple ATS Friendly Resume",
    ats: "95% ATS",
    color: "bg-gray-100",
    image: minimalClean,
  },

  {
    id: "split-label",
    name: "Split Label",
    description: "Elegant label-left layout for creative & business roles",
    ats: "94% ATS",
    color: "bg-rose-50",
    image: splitLabel,
  },

  {
    id: "corporate-band",
    name: "Corporate Band",
    description: "Bold header for Marketing & Corporate roles",
    ats: "97% ATS",
    color: "bg-slate-800",
    image: corporateBand,
  },

  {
    id: "classic-serif",
    name: "Classic Serif",
    description: "Centered serif header, elegant single-column layout",
    ats: "98% ATS",
    color: "bg-neutral-100",
    image: classicSerif,
  },

  {
    id: "corporate-classic",
    name: "Corporate Classic",
    description: "Centered bordered headers, structured grid layout",
    ats: "97% ATS",
    color: "bg-slate-100",
    image: corporateClassic,
  },

  {
    id: "executive-blue",
    name: "Executive Blue",
    description:
      "Bold blue accents, badge-style certifications, GitHub-linked projects",
    ats: "96% ATS",
    color: "bg-blue-50",
    image: executiveBlue,
  },

  {
  id: "professional-modern",
  name: "Professional Modern",
  description: "Professional ATS Resume with Icon Sections",
  ats: "99% ATS",
  featured: true,
  color: "bg-rose-50",
  image: professionalModern,
},


{
  id: "enhancv-modern",
  name: "Enhancv Modern",
  description: "Modern professional layout inspired by Enhancv with clean ATS-friendly design",
  ats: "99% ATS",
  color: "bg-slate-700",
  image: enhancvModern,
},
{
  id: "harvard-ats",
  name: "Harvard ATS",
  description:
    "Classic Harvard-style ATS-friendly resume with a clean and professional layout",
  ats: "99% ATS",
  color: "bg-gray-800",
  image: harvardATS,
},
];