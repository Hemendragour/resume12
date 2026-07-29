import type { ResumeTheme } from "./theme.types";

export const corporateBandTheme: ResumeTheme = {
  id: "corporate-band",

  page: {
    padding: "40px",
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: 1.5,
  },

  header: {
    align: "center",
    nameSize: "24px",
    contactSize: "11px",
    showIcons: false,
    showTitle: true,
    divider: false,
    compact: false,
  },

  section: {
    uppercase: true,
    divider: true,
    spacing: "20px",
  },

  experience: {
    companyLeft: true,
    dateRight: true,
    roleItalic: false,
    bullets: true,
  },

  education: {
    dateRight: true,
  },

  projects: {
    dateRight: true,
    linksBelowDate: true,
    technologiesInline: true,
    bullets: true,
  },

  skills: {
    layout: "tags",
  },

  colors: {
    primary: "#1e40af",     // blue — company names, accents
    secondary: "#1e40af",
    text: "#1f2937",        // dark slate body text
    muted: "#4b5563",
    headerBg: "#000000",    // black band
    headerText: "#ffffff",
  },
};