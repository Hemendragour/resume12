import type { ResumeTheme } from "./theme.types";

export const technicalClassicTheme: ResumeTheme = {
  id: "technical-classic",

  page: {
    padding: "48px",
    fontFamily: "Calibri",
    fontSize: "11px",
    lineHeight: 1.45,
  },

 header: {
  align: "center",

  nameSize: "20px",

  contactSize: "11px",

  showIcons: false,

  showTitle: false,

  divider: true,

  compact: true,
},

  section: {
    uppercase: true,
    divider: true,
    spacing: "20px",
  },

  experience: {
    companyLeft: true,
    dateRight: true,
    roleItalic: true,
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
    layout: "inline",
  },

  colors: {
  primary: "#0f172a",
  secondary: "#0f172a",
  text: "#334155",
  muted: "#64748b",
  headerBg: "transparent",
  headerText: "#0f172a",
},
};