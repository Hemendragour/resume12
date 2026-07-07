export const customSectionConfig = {
  hackathons: {
    title: "Hackathons",

    fields: {
      title: "Hackathon Name",
      subtitle: "Organization",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Achievement",
    },
  },

  "open-source": {
    title: "Open Source",

    fields: {
      title: "Project Name",
      subtitle: "GitHub Repository",
      startDate: "",
      endDate: "",
      description: "Contribution",
    },
  },

  publications: {
    title: "Publications",

    fields: {
      title: "Publication Title",
      subtitle: "Journal / Publisher",
      startDate: "Published Date",
      endDate: "",
      description: "Abstract",
    },
  },

  "research-papers": {
    title: "Research Papers",

    fields: {
      title: "Paper Title",
      subtitle: "Conference / Journal",
      startDate: "Published Date",
      endDate: "",
      description: "Summary",
    },
  },

  "volunteer-experience": {
    title: "Volunteer Experience",

    fields: {
      title: "Organization",
      subtitle: "Role",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Responsibilities",
    },
  },

  leadership: {
    title: "Leadership",

    fields: {
      title: "Position",
      subtitle: "Organization",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Achievements",
    },
  },

  training: {
    title: "Training",

    fields: {
      title: "Training Name",
      subtitle: "Institute",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Details",
    },
  },

  workshops: {
    title: "Workshops",

    fields: {
      title: "Workshop Name",
      subtitle: "Organizer",
      startDate: "Date",
      endDate: "",
      description: "Learning",
    },
  },

  achievements: {
    title: "Achievements",

    fields: {
      title: "Achievement",
      subtitle: "Organization",
      startDate: "Date",
      endDate: "",
      description: "Details",
    },
  },

  custom: {
    title: "Custom",

    fields: {
      title: "Title",
      subtitle: "Subtitle",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
    },
  },
} as const;