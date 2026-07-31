export const PeachModernTheme = {
  fontFamily: "font-sans",

  fontSize: {
    name: "text-[34px]",
    title: "text-[17px]",

    contact: "text-[13px]",

    sectionHeader: "text-[15px]",

    itemTitle: "text-[15px]",

    itemSubtitle: "text-[13px]",

    body: "text-[13px]",

    date: "text-[12px]",
  },

  spacing: {
    page: "px-10 py-8",

    section: "mt-6",

    paragraph: "mt-3",

    list: "mt-2",

    divider: "pb-2",
  },

  colors: {
    page: "bg-white",

    header: "bg-[#f3c6be]",

    heading: "text-gray-900",

    body: "text-gray-700",

    muted: "text-gray-600",

    border: "border-gray-300",

    iconBackground: "bg-[#f3c6be]",

    icon: "text-gray-900",
  },

  radius: {
    header: "rounded-b-[24px]",

    icon: "rounded-full",
  },
} as const;