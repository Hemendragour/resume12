import mongoose, { Schema, Document } from "mongoose";

export interface IResumeAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;

  atsScore: number;

  matchedKeywords: string[];
  missingKeywords: string[];

  suggestions: string[];

  createdAt: Date;
  updatedAt: Date;
  strengths: string[];
weaknesses: string[];

optimizedSummary: string;

improvedExperience: string[];
}

const resumeAnalysisSchema =
  new Schema<IResumeAnalysis>(
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

      atsScore: {
        type: Number,
        required: true,
      },

      matchedKeywords: {
        type: [String],
        default: [],
      },

      missingKeywords: {
        type: [String],
        default: [],
      },
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

      suggestions: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

export const ResumeAnalysis = mongoose.model(
  "ResumeAnalysis",
  resumeAnalysisSchema
);