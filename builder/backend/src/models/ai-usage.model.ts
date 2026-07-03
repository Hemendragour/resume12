import mongoose, { Schema, Document } from "mongoose";

export interface IAIUsage extends Document {
  userId: mongoose.Types.ObjectId;

  feature:
  | "generate-summary"
  | "generate-experience"
  | "rewrite-experience"
  | "suggest-skills"
  | "generate-project"
  | "ats-analysis"
  | "generate-project-description";
  tokensUsed: number;

  createdAt: Date;
  updatedAt: Date;
}

const aiUsageSchema = new Schema<IAIUsage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    feature: {
      type: String,
      required: true,
    },

    tokensUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const AIUsage = mongoose.model<IAIUsage>(
  "AIUsage",
  aiUsageSchema
);