export const HarvardATSTheme = {
  page: {
    container:
      "w-full bg-white px-10 py-10 text-slate-900 font-['Times_New_Roman']",
  },

  colors: {
    heading: "text-black",
    body: "text-black",
    muted: "text-black",
    light: "text-slate-500",
    link: "text-blue-700",
  },

  fontFamily: {
    heading: "font-['Times_New_Roman']",
    body: "font-['Times_New_Roman']", // all-serif, matches image
  },

  fontSize: {
    name: "text-[30px]",
    role: "text-[14px]",
    contact: "text-[11px]",
    sectionTitle: "text-[13px]",
    itemTitle: "text-[13px]",
    itemSubtitle: "text-[12px]",
    body: "text-[11px]",
    small: "text-[10px]",
    date: "text-[11px]",
    location: "text-[11px]",
  },

  fontWeight: {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
  },

  lineHeight: {
    heading: "leading-none", // sabse compact
    title: "leading-tight", // headings ke liye
    body: "leading-4", // body text compact
  },

  spacing: {
    page: "space-y-6",
    section: "mt-6",
    item: "mt-4",
    itemHeader: "mt-2",
    paragraph: "mt-2",
    bullet: "space-y-1",
  },

  border: {
    primary: "border-slate-400",
    dark: "border-black",
  },

  divider: {
    header: "border-b-2 border-black mt-3",
    section: "border-b-2 border-black mt-1 w-full",
  },
  layout: {
    between: "flex justify-between items-start",
    center: "flex justify-center items-center",
    wrapCenter: "flex flex-wrap justify-center gap-2",
    column: "flex flex-col",
  },

  list: {
    bullet: "list-disc ml-5",
  },

  links: {
    default: "hover:underline",
  },

  skills: {
    row: "flex items-start gap-3",
    category: "w-36 font-semibold shrink-0", // widened from w-28, added shrink-0
    value: "flex-1",
  },

  experience: {
    container: "space-y-5",
  },

  education: {
    container: "space-y-4",
  },

  project: {
    container: "space-y-5",
    header: "flex justify-between items-start",
    tech: "italic text-slate-600 text-[11px] mt-1",
    links: "flex gap-4 mt-2",
  },

  // NEW: for Strengths / Interests / Languages (dot-separated inline lists)
  inlineList: {
    row: "flex flex-wrap items-center gap-x-2 gap-y-1",
    item: "text-[11px]",
    separator: "text-slate-400",
  },

  // NEW: for Certifications (two-column bullet list)
  twoColumn: {
    grid: "grid grid-cols-2 gap-x-8 gap-y-1",
    item: "flex items-start gap-2 text-[11px]",
    bulletDot: "mt-[6px] w-1 h-1 rounded-full bg-slate-800 shrink-0",
  },

  // NEW: for Additional Information (key: value pairs, pipe-separated)
  keyValueList: {
    row: "flex flex-wrap items-center gap-x-2 text-[11px]",
    label: "font-semibold",
    separator: "text-slate-400 mx-1",
  },
  // templates/harvard-ats/components/theme.harvard-ats.ts
  // add this block inside HarvardATSTheme, alongside your existing "colors" key

  iconColors: {
    body: "#0f172a", // slate-900 — dark, image2 jaisa
    light: "#334155", // slate-700
    link: "#1d4ed8",
  },
  content: {
    indent: "pl-8", // paragraph/body text ka left indent, heading se offset
    noIndent: "pl-0",
  },
} as const;

export type HarvardATSThemeType = typeof HarvardATSTheme;
