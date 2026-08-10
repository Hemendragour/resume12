// export const ModernProfessionalTheme = {
//   page: {
//     container:
//       "w-full bg-white text-slate-900 font-['Inter'] px-10 py-10",
//   },

//   colors: {
//     heading: "text-slate-900",
//     body: "text-slate-700",
//     muted: "text-slate-500",
//     light: "text-slate-400",
//     accent: "text-blue-600",
//     link: "text-blue-700",
//     border: "border-slate-200",
//   },

//   fontFamily: {
//     heading: "font-['Poppins']",
//     body: "font-['Inter']",
//   },

//   fontSize: {
//     name: "text-[34px]",
//     role: "text-[18px]",
//     contact: "text-[12px]",

//     sectionTitle: "text-[15px]",

//     itemTitle: "text-[13px]",
//     itemSubtitle: "text-[12px]",

//     body: "text-[12px]",
//     small: "text-[11px]",

//     date: "text-[11px]",
//     location: "text-[11px]",
//   },

//   fontWeight: {
//     bold: "font-bold",
//     semibold: "font-semibold",
//     medium: "font-medium",
//     normal: "font-normal",
//   },

//   lineHeight: {
//     heading: "leading-tight",
//     title: "leading-5",
//     body: "leading-5",
//   },

//   spacing: {
//     page: "space-y-8",

//     section: "mt-8",

//     item: "mt-5",

//     itemHeader: "mt-2",

//     paragraph: "mt-2",

//     bullet: "space-y-2",
//   },

//   border: {
//     primary: "border-slate-200",
//     dark: "border-slate-300",
//   },

//   divider: {
//     header: "border-b border-slate-300 pb-6",
//     section: "border-b border-slate-200 mt-2",
//   },

//   layout: {
//     between: "flex justify-between items-start",

//     center: "flex justify-center items-center",

//     wrapCenter: "flex flex-wrap items-center gap-3",

//     column: "flex flex-col",

//     twoColumn: "grid grid-cols-12 gap-8",

//     left: "col-span-8",

//     right: "col-span-4",
//   },

//   list: {
//     bullet: "list-disc ml-5 space-y-1",
//   },

//   links: {
//     default: "hover:underline text-blue-700",
//   },

//   skills: {
//     container: "flex flex-wrap gap-2",

//     badge:
//       "px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium",
//   },

//   experience: {
//     container: "space-y-6",
//   },

//   education: {
//     container: "space-y-5",
//   },

//   project: {
//     container: "space-y-5",

//     header: "flex justify-between items-start",

//     tech: "text-[11px] italic text-slate-500 mt-1",

//     links: "flex gap-4 mt-2",
//   },

//   inlineList: {
//     row: "flex flex-wrap items-center gap-2",

//     item: "text-[11px]",

//     separator: "text-slate-400",
//   },

//   twoColumn: {
//     grid: "grid grid-cols-2 gap-4",

//     item: "text-[11px]",
//   },

//   keyValueList: {
//     row: "flex flex-wrap items-center gap-2 text-[11px]",

//     label: "font-semibold",

//     separator: "text-slate-400",
//   },

//   iconColors: {
//     body: "#0f172a",
//     light: "#64748b",
//     link: "#2563eb",
//   },

//   content: {
//     indent: "pl-4",
//     noIndent: "pl-0",
//   },
// } as const;

// export type ModernProfessionalThemeType =
//   typeof ModernProfessionalTheme;

export const ModernProfessionalTheme = {
  page: {
    container: "w-full bg-white text-slate-900 font-['Inter'] px-10 py-10",
  },

  colors: {
    heading: "text-slate-900",
    body: "text-slate-700",
    muted: "text-slate-500",
    light: "text-slate-400",
    accent: "text-blue-600",
    link: "text-blue-700",
    border: "border-slate-200",
  },

  fontFamily: {
    heading: "font-['Poppins']",
    body: "font-['Inter']",
  },

  fontSize: {
    name: "text-[34px]",
    role: "text-[18px]",
    contact: "text-[12px]",

    sectionTitle: "text-[14px]",

    itemTitle: "text-[13px]",
    itemSubtitle: "text-[12px]",

    body: "text-[12.5px]",
    small: "text-[11px]",

    date: "text-[11px]",
    location: "text-[11px]",
  },

  fontWeight: {
    bold: "font-bold",
    semibold: "font-semibold",
    medium: "font-medium",
    normal: "font-normal",
  },

  lineHeight: {
    heading: "leading-tight",
    title: "leading-5",
    body: "leading-[1.7]",
  },

  spacing: {
    page: "space-y-8",
    section: "mt-5",
    item: "mt-5",
    itemHeader: "mt-2",
    paragraph: "mt-2",
    bullet: "space-y-2",
  },

  border: {
    primary: "border-slate-200",
    dark: "border-slate-300",
  },

  divider: {
    header: "border-b border-slate-300 pb-6",
    section: "border-b border-slate-200 mt-3",
  },

  layout: {
    between: "flex justify-between items-start",
    center: "flex justify-center items-center",
    wrapCenter: "flex flex-wrap items-center gap-3",
    column: "flex flex-col",
    twoColumn: "grid grid-cols-12 gap-8",
    left: "col-span-8",
    right: "col-span-4",
  },

  list: {
    bullet: "list-disc ml-5 space-y-1",
  },

  links: {
    default: "hover:underline text-blue-700",
  },

  skills: {
    container: "flex flex-wrap gap-2",
    badge:
      "px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium",
  },

  experience: {
    container: "space-y-6",
  },

  education: {
    container: "space-y-5",
  },

  project: {
    container: "space-y-5",
    header: "flex justify-between items-start",
    tech: "text-[11px] italic text-slate-500 mt-1",
    links: "flex gap-4 mt-2",
  },

  inlineList: {
    row: "flex flex-wrap items-center gap-2",
    item: "text-[11px]",
    separator: "text-slate-400",
  },

  twoColumn: {
    grid: "grid grid-cols-2 gap-4",
    item: "text-[11px]",
  },

  keyValueList: {
    row: "flex flex-wrap items-center gap-2 text-[11px]",
    label: "font-semibold",
    separator: "text-slate-400",
  },

  iconColors: {
    body: "#0f172a",
    light: "#64748b",
    link: "#2563eb",
  },

  content: {
    indent: "pl-4",
    noIndent: "pl-0",
  },

  // NEW — icon badge used by SectionHeader (matches reference image)
  sectionHeader: {
    badge:
      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white",
    badgeIconSize: 13,
    title:
      "font-['Poppins'] text-[14px] font-bold uppercase tracking-[0.06em] text-slate-900",
  },
} as const;

export type ModernProfessionalThemeType = typeof ModernProfessionalTheme;