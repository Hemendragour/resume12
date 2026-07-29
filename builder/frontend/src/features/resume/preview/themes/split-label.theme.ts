import type { ResumeTheme } from "./theme.types";

export const splitLabelTheme: ResumeTheme = {
  id: "split-label",

  colors: {
    primary: "#be185d",
    secondary: "#be185d",
    text: "#1f2937",
    muted: "#6b7280",
    headerBg: "transparent",
    headerText: "#111827",
  },

  page: {
    padding: "40px",
    fontFamily: "Inter",
    fontSize: "12px",
    lineHeight: 1.5,
  },

  header: {
    align: "center",
    nameSize: "26px",
    contactSize: "11px",
    showIcons: false,
    showTitle: true,
    divider: false,
    compact: false,
  },

  section: {
    uppercase: false,
    divider: true,
    spacing: "24px",
    layout: "split",
  },

  experience: { companyLeft: true, dateRight: true, roleItalic: false, bullets: true },
  education: { dateRight: true },
  projects: { dateRight: true, linksBelowDate: true, technologiesInline: true, bullets: true },
  skills: { layout: "inline" },
};