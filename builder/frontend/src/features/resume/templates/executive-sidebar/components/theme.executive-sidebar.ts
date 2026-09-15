// Executive Sidebar theme — light sidebar (photo, contact, skills, languages)
// + a single navy highlight bar for Name/Profession. Dates and skills stay
// in plain neutral colors on purpose — the highlight color is reserved for
// the name/profession bar only.

export const ExecutiveSidebarTheme = {
  page: {
    container: "w-full bg-white flex text-slate-800 font-sans min-h-full",
  },

  sidebar: {
    width: "w-[34%]",
    bg: "bg-slate-100",
    padding: "px-5 py-6",
    gap: "space-y-5",
  },

  main: {
    width: "w-[66%]",
    padding: "px-7 pt-5 pb-7",
  },

  accent: {
    // Navy — reserved strictly for the name/profession bar
    bg: "bg-[#152a47]",
    text: "text-[#152a47]",
    bgSoft: "bg-[#152a47]/10",
  },

  nameBar: {
    container: "bg-[#152a47] px-7 py-5",
    name: "text-white text-[26px] font-bold tracking-wide leading-tight",
    profession: "text-slate-200 text-[13px] italic mt-1",
  },

  colors: {
    heading: "text-slate-900",
    body: "text-slate-700",
    muted: "text-slate-500",
    light: "text-slate-400",
    sidebarText: "text-slate-700",
    sidebarHeading: "text-slate-900",
  },

  fontSize: {
    sectionTitle: "text-[13px]",
    itemTitle: "text-[12.5px]",
    itemSubtitle: "text-[11.5px]",
    body: "text-[11px]",
    small: "text-[10.5px]",
    date: "text-[10.5px]",
    sidebarLabel: "text-[10.5px]",
    sidebarBody: "text-[11px]",
  },

  fontWeight: {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
  },

  lineHeight: {
    heading: "leading-tight",
    body: "leading-[1.45]",
  },

  spacing: {
    page: "",
    section: "mt-5",
    item: "mt-3",
    itemHeader: "mt-1.5",
    bullet: "space-y-1",
  },

  divider: {
    // Plain neutral rule — never the navy accent, per the "no highlight
    // outside name/profession" requirement
    section: "border-b border-slate-300 pb-1 mb-2",
  },

  list: {
    bullet: "list-disc list-outside pl-4",
  },

  photo: {
    box: "w-full aspect-square overflow-hidden rounded-md bg-slate-300 ring-1 ring-slate-300",
  },

  skills: {
    tag: "inline-block bg-white border border-slate-300 rounded px-2 py-0.5 text-[10.5px] text-slate-700 mr-1 mb-1",
  },

  languages: {
    row: "flex items-center justify-between",
    name: "text-[11px] text-slate-700",
    level: "text-[10px] text-slate-500 uppercase tracking-wide",
  },

  links: {
    default: "hover:underline text-[#152a47] break-all",
  },

  iconColors: {
    sidebar: "#334155",
  },
} as const;

export type ExecutiveSidebarThemeType = typeof ExecutiveSidebarTheme;
