import mongoose, { Schema, Document } from "mongoose";

export const ResumeStatus = {
  DRAFT: "draft",
  COMPLETED: "completed",
} as const;

export const ResumeTemplates = {
  TECHNICAL: "technical-developer",
  MODERN: "modern-professional",
  MINIMAL: "minimal-clean",
} as const;

export const DefaultResumeSections = [
  {
    id: "personalInfo",
    type: "personalInfo",
    title: "Personal Info",
    enabled: true,
    order: 1,
  },
  {
    id: "summary",
    type: "summary",
    title: "Summary",
    enabled: true,
    order: 2,
  },
  {
    id: "experience",
    type: "experience",
    title: "Experience",
    enabled: true,
    order: 3,
  },
  {
    id: "education",
    type: "education",
    title: "Education",
    enabled: true,
    order: 4,
  },
  {
    id: "skills",
    type: "skills",
    title: "Skills",
    enabled: true,
    order: 5,
  },
  {
    id: "projects",
    type: "projects",
    title: "Projects",
    enabled: true,
    order: 6,
  },
  {
    id: "languages",
    type: "languages",
    title: "Languages",
    enabled: true,
    order: 7,
  },
  {
    id: "certifications",
    type: "certifications",
    title: "Certificates",
    enabled: true,
    order: 8,
  },
  {
    id: "awards",
    type: "awards",
    title: "Awards",
    enabled: true,
    order: 9,
  },
  {
    id: "interests",
    type: "interests",
    title: "Interests",
    enabled: true,
    order: 10,
  },
];

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;

  title: string;
  version: number;
  targetRole?: string;
  status: "draft" | "completed";

  // Sharing fields
  shareId: string | null;
  isPublic: boolean;

  sections: {
  id: string;
  type: string;
  title: string;
  enabled: boolean;
  order: number;
}[];

  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone?: string;
    address?: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
    photo?: string;
  };

  summary?: string;

  skills: string[];

  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    currentlyWorking?: boolean;
    responsibilities: string[];
    achievements: string[];
  }[];

  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear?: number;
    cgpa?: string;
  }[];

  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
  }[];

  certifications: string[];
  languages: string[];
  awards: string[];
  interests: string[];

  templateId: string;

  createdAt: Date;
  updatedAt: Date;
}



const ResumeSectionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    targetRole: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(ResumeStatus),
      default: ResumeStatus.DRAFT,
    },

    // Sharing fields
    shareId: {
      type: String,
      default: null,
      index: true,           // Useful for quick lookup by shareId
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    personalInfo: {
      fullName: {
        type: String,
        default: "",
        trim: true,
      },
      title: {
        type: String,
        default: "",
        trim: true,
      },
      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      linkedIn: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
      photo: {
        type: String,
        default: "",
      },
    },

    summary: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, default: "" },
        currentlyWorking: { type: Boolean, default: false },
        responsibilities: { type: [String], default: [] },
        achievements: { type: [String], default: [] },
      },
    ],

    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startYear: { type: Number, required: true },
        endYear: { type: Number },
        cgpa: { type: String, default: "" },
      },
    ],

    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        technologies: { type: [String], default: [] },
        link: { type: String, default: "" },
        github: { type: String, default: "" },
      },
    ],

    certifications: {
      type: [String],
      default: [],
    },

    languages: {
      type: [String],
      default: [],
    },

    awards: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    templateId: {
      type: String,
      default: ResumeTemplates.TECHNICAL,
    },

    sections: {
  type: [ResumeSectionSchema],
  default: DefaultResumeSections,
},
  },
  {
    timestamps: true,
  }
);

// Indexes
resumeSchema.index({ userId: 1, updatedAt: -1 });
resumeSchema.index({ userId: 1, title: 1 });
resumeSchema.index({ shareId: 1 });           // For fast public share lookup
resumeSchema.index({ isPublic: 1, shareId: 1 });

export const Resume = mongoose.model<IResume>("Resume", resumeSchema);