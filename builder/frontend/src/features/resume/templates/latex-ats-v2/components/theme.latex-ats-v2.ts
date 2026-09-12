// LaTeX ATS theme — mirrors the classic "Jake's Resume"-style LaTeX template:
// serif body text, small-caps section headings with a thin rule underneath,
// tight vertical rhythm, tabular-style two-column subheadings.

export const LatexATSV2Theme = {
  page: {
    container: "w-full bg-white px-9 py-8 text-black font-serif",
  },

  colors: {
    heading: "text-black",
    body: "text-black",
    muted: "text-black",
    light: "text-slate-500",
    link: "text-blue-700",
  },

  fontFamily: {
    heading: "font-serif",
    body: "font-serif",
  },

  fontSize: {
    name: "text-[26px]",
    role: "text-[15px]",
    contact: "text-[10.5px]",
    sectionTitle: "text-[13px]",
    itemTitle: "text-[12.5px]",
    itemSubtitle: "text-[11.5px]",
    body: "text-[10.5px]",
    small: "text-[10px]",
    date: "text-[10.5px]",
    location: "text-[10.5px]",
  },

  fontWeight: {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
  },

  lineHeight: {
    heading: "leading-tight",
    title: "leading-tight",
    body: "leading-[1.35]",
  },

  spacing: {
    page: "space-y-4",
    section: "mt-4",
    item: "mt-3",
    itemHeader: "mt-1.5",
    paragraph: "mt-1.5",
    bullet: "space-y-0",
  },

  border: {
    primary: "border-slate-400",
    dark: "border-black",
  },

  // \titlerule sits right under the small-caps heading text, full width
  divider: {
    header: "border-b border-black mt-2",
    section: "border-b border-black mt-0.5 w-full",
  },

  layout: {
    between: "flex justify-between items-start",
    center: "flex justify-center items-center",
    wrapCenter: "flex flex-wrap justify-center gap-2",
    column: "flex flex-col",
  },

  list: {
    bullet: "list-disc ml-4",
  },

  links: {
    default: "hover:underline text-black",
  },

  // Skills render as one inline "Label: value, value, ..." line per category,
  // matching \textbf{Category:} value \\ in the .tex source.
  skills: {
    row: "flex flex-wrap items-baseline gap-x-1",
    category: "font-bold shrink-0",
    value: "flex-1",
  },

  experience: {
    container: "space-y-4",
  },

  education: {
    container: "space-y-3",
  },

  project: {
    container: "space-y-4",
    header: "flex justify-between items-start",
    tech: "italic text-slate-700 text-[10.5px] mt-0.5",
    links: "flex gap-3",
  },

  inlineList: {
    row: "flex flex-wrap items-center gap-x-2 gap-y-1",
    item: "text-[10.5px]",
    separator: "text-slate-400",
  },

  twoColumn: {
    grid: "grid grid-cols-2 gap-x-8 gap-y-1",
    item: "flex items-start gap-2 text-[10.5px]",
    bulletDot: "mt-[6px] w-1 h-1 rounded-full bg-black shrink-0",
  },

  keyValueList: {
    row: "flex flex-wrap items-center gap-x-2 text-[10.5px]",
    label: "font-semibold",
    separator: "text-slate-400 mx-1",
  },

  iconColors: {
    body: "#000000",
    light: "#334155",
    link: "#1d4ed8",
  },

  content: {
    indent: "pl-8",
    noIndent: "pl-0",
  },
} as const;

export type LatexATSV2ThemeType = typeof LatexATSV2Theme;
