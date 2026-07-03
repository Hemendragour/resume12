import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IResumeVersion
  extends Document {
  resumeId: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;

  version: number;

  snapshot: Record<string, any>;

  createdAt: Date;

  updatedAt: Date;
}

const resumeVersionSchema =
  new Schema<IResumeVersion>(
    {
      resumeId: {
        type: Schema.Types.ObjectId,
        ref: "Resume",
        required: true,
        index: true,
      },

      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      version: {
        type: Number,
        required: true,
      },

      snapshot: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

resumeVersionSchema.index({
  resumeId: 1,
  version: -1,
});

export const ResumeVersion =
  mongoose.model<IResumeVersion>(
    "ResumeVersion",
    resumeVersionSchema
  );