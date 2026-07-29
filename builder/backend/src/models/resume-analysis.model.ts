import mongoose, { Schema, Document } from "mongoose";

export interface IResumeAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;

  jobDescription: string;

  atsScore: number;

  grade: "A" | "B" | "C" | "D" | "F";

  breakdown: {
    keywordScore: number;
    summaryScore: number;
    skillsScore: number;
    experienceScore: number;
    projectsScore: number;
    educationScore: number;
    formattingScore: number;
  };

  matchedKeywords: string[];
  missingKeywords: string[];

  recommendations: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }[];

  strengths: string[];
  weaknesses: string[];

  optimizedSummary: string;

  improvedExperience: string[];

  createdAt: Date;
  updatedAt: Date;
}

const resumeAnalysisSchema = new Schema<IResumeAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobDescription: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      enum: ["A", "B", "C", "D", "F"],
      default: "F",
    },

    breakdown: {
      keywordScore: { type: Number, default: 0 },
      summaryScore: { type: Number, default: 0 },
      skillsScore: { type: Number, default: 0 },
      experienceScore: { type: Number, default: 0 },
      projectsScore: { type: Number, default: 0 },
      educationScore: { type: Number, default: 0 },
      formattingScore: { type: Number, default: 0 },
    },

    matchedKeywords: {
      type: [String],
      default: [],
    },

    missingKeywords: {
      type: [String],
      default: [],
    },

    recommendations: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        priority: {
          type: String,
          enum: ["high", "medium", "low"],
          default: "medium",
        },
      },
    ],

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    optimizedSummary: {
      type: String,
      default: "",
    },

    improvedExperience: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const ResumeAnalysis = mongoose.model<IResumeAnalysis>(
  "ResumeAnalysis",
  resumeAnalysisSchema
);