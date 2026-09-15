// LaTeX Sidebar theme — light #F1F5F9 sidebar (personal info, skills, languages, certificates)
// White main panel with LaTeX-inspired typography.
// No dark accent bar — name & title live on the white page.

export const LatexSidebarTheme = {
  page: {
    container: "w-full bg-white flex text-slate-800 font-sans min-h-full",
  },

  sidebar: {
    width: "w-[36%]",
    bg: "bg-[#F1F5F9]",
    padding: "px-5 py-7",
    gap: "space-y-5",
    border: "border-r border-slate-200",
  },

  main: {
    width: "w-[64%]",
    padding: "px-7 pt-6 pb-7",
  },

  nameHeader: {
    container: "mb-4 pb-3 border-b-2 border-slate-800",
    name: "text-[26px] font-bold tracking-wide text-slate-900 leading-tight",
    title: "text-[13px] text-slate-600 mt-0.5 italic",
  },

  colors: {
    heading: "text-slate-900",
    body: "text-slate-700",
    muted: "text-slate-500",
    light: "text-slate-400",
    sidebarText: "text-slate-700",
    sidebarHeading: "text-slate-800",
    sidebarMuted: "text-slate-500",
  },

  fontSize: {
    sectionTitle: "text-[12px]",
    itemTitle: "text-[12px]",
    itemSubtitle: "text-[11px]",
    body: "text-[11px]",
    small: "text-[10.5px]",
    date: "text-[10.5px]",
    sidebarLabel: "text-[11px]",
    sidebarBody: "text-[11px]",
    sidebarSmall: "text-[10px]",
  },

  fontWeight: {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
  },

  lineHeight: {
    heading: "leading-tight",
    body: "leading-[1.5]",
  },

  spacing: {
    page: "",
    section: "mt-4",
    item: "mt-3",
    itemHeader: "mt-1.5",
    bullet: "space-y-0.5",
  },

  divider: {
    section: "border-b border-slate-300 pb-0.5 mb-2",
    sidebarSection: "border-b border-slate-300 pb-0.5 mb-2",
  },

  layout: {
    between: "flex justify-between items-start gap-3",
  },

  list: {
    bullet: "list-disc list-outside pl-4",
  },

  skills: {
    tag: "inline-block bg-white border border-slate-300 rounded px-2 py-0.5 text-[10px] text-slate-700 mr-1 mb-1",
    dot: "inline-block w-1.5 h-1.5 rounded-full bg-slate-400 mr-2 shrink-0",
  },

  languages: {
    row: "flex items-center justify-between",
    name: "text-[11px] text-slate-700",
    level: "text-[10px] text-slate-500 uppercase tracking-wide",
  },

  links: {
    default: "hover:underline text-slate-700 break-all",
  },

  iconColors: {
    sidebar: "#475569",
  },
} as const;

export type LatexSidebarThemeType = typeof LatexSidebarTheme;
