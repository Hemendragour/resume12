export const EnhancvModernTheme = {
  colors: {
    page: "bg-white",
    heading: "text-slate-900",
    body: "text-slate-700",
    muted: "text-slate-500",
    border: "border-slate-800",
    accent: "text-slate-900",
  },

  fontFamily: "font-serif",

  fontSize: {
    name: "text-[36px]",
    title: "text-[20px]",
    contact: "text-[13px]",
    sectionHeader: "text-[18px]",
    itemTitle: "text-[16px]",
    itemSubtitle: "text-[14px]",
    body: "text-[13px]",
    date: "text-[12px]",
  },

  // NEW — add this block
  lineHeight: {
    name: "leading-tight",      // 1.2 — headings shouldn't be airy
    title: "leading-snug",      // 1.375
    body: "leading-relaxed",    // 1.625 — this is what your bullets need, fixed everywhere
    contact: "leading-normal",
  },

  fontWeight: {
    name: "font-bold",
    heading: "font-bold",
    title: "font-medium",
    body: "font-normal",
  },

  spacing: {
    page: "px-10 py-8",
    section: "mt-8",     // gap BETWEEN sections (Summary -> Skills -> Experience)
    item: "mt-4",        // gap BETWEEN entries within a section (throne8 -> Google)
    // NEW — add these
    bullet: "space-y-1",       // gap BETWEEN individual bullet lines in one entry
    itemHeader: "mt-3",        // fixed gap between title/date row and the bullets below it
  },

  radius: {
    none: "",
  },
} as const;