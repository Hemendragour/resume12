// import mongoose, { Schema, Document } from "mongoose";

// export interface IResumeAnalysis extends Document {
//   userId: mongoose.Types.ObjectId;
//   resumeId: mongoose.Types.ObjectId;

//   jobDescription: string;

//   atsScore: number;

//   grade: "A" | "B" | "C" | "D" | "F";

//   breakdown: {
//   type: Map,
//   of: Number,
//   default: {},
// },

//   matchedKeywords: string[];
//   missingKeywords: string[];

//   recommendations: {
//     title: string;
//     description: string;
//     priority: "high" | "medium" | "low";
//   }[];

//   strengths: string[];
//   weaknesses: string[];

//   optimizedSummary: string;

//   improvedExperience: string[];

//   createdAt: Date;
//   updatedAt: Date;
// }

// const resumeAnalysisSchema = new Schema<IResumeAnalysis>(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     resumeId: {
//       type: Schema.Types.ObjectId,
//       ref: "Resume",
//       required: true,
//     },

//     jobDescription: {
//       type: String,
//       default: "",
//     },

//     atsScore: {
//       type: Number,
//       required: true,
//     },

//     grade: {
//       type: String,
//       enum: ["A", "B", "C", "D", "F"],
//       default: "F",
//     },

//     breakdown: {
//       keywordScore: { type: Number, default: 0 },
//       summaryScore: { type: Number, default: 0 },
//       skillsScore: { type: Number, default: 0 },
//       experienceScore: { type: Number, default: 0 },
//       projectsScore: { type: Number, default: 0 },
//       educationScore: { type: Number, default: 0 },
//       formattingScore: { type: Number, default: 0 },
//     },

//     matchedKeywords: {
//       type: [String],
//       default: [],
//     },

//     missingKeywords: {
//       type: [String],
//       default: [],
//     },

//     recommendations: [
//       {
//         title: { type: String, required: true },
//         description: { type: String, required: true },
//         priority: {
//   type: String,
//   enum: [
//     "critical",
//     "high",
//     "medium",
//     "low",
//   ],
//   default: "medium",
// },
//       },
//     ],

//     strengths: {
//       type: [String],
//       default: [],
//     },

//     weaknesses: {
//       type: [String],
//       default: [],
//     },

//     optimizedSummary: {
//       type: String,
//       default: "",
//     },

//     improvedExperience: {
//       type: [String],
//       default: [],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const ResumeAnalysis = mongoose.model<IResumeAnalysis>(
//   "ResumeAnalysis",
//   resumeAnalysisSchema
// );



import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IResumeAnalysis
  extends Document {
  userId: mongoose.Types.ObjectId;

  resumeId: mongoose.Types.ObjectId;

  jobDescription: string;

  atsScore: number;

  grade:
    | "A"
    | "B"
    | "C"
    | "D"
    | "F";

  /**
   * Dynamic ATS category scores.
   *
   * Example:
   *
   * {
   *   contact: 9,
   *   sections: 13,
   *   skills: 14,
   *   keywords: 17,
   *   experience: 12,
   *   actionVerbs: 8,
   *   quantifiedResults: 4,
   *   formatting: 9
   * }
   */
  breakdown: Record<
    string,
    number
  >;

  matchedKeywords: string[];

  missingKeywords: string[];
  dateConsistency?: {
  invalidDates: string[];
  overlappingDates: string[];
  reversedDateRanges: string[];
  inconsistentDateFormats: string[];
  missingDates: string[];
  score: number;
  issues: string[];
  suggestions: string[];
};

  recommendations: {
  title: string;
  description: string;
  priority:
    | "critical"
    | "high"
    | "medium"
    | "low";
  category: string;
  impact: number;
  actionable: boolean;
  suggestedFix: string;
  evidence: string;
}[];

  strengths: string[];

  weaknesses: string[];

  optimizedSummary: string;

  improvedExperience: string[];

  createdAt: Date;

  updatedAt: Date;
}

const resumeAnalysisSchema =
  new Schema(
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

        enum: [
          "A",
          "B",
          "C",
          "D",
          "F",
        ],

        default: "F",
      },

      /**
       * IMPORTANT:
       *
       * ATS categories are configuration-driven.
       *
       * Do NOT hardcode:
       * keywordScore
       * summaryScore
       * projectsScore
       * educationScore
       *
       * here.
       *
       * New ATS categories can be added without
       * changing this MongoDB schema.
       */
      breakdown: {
        type: Map,

        of: Number,

        default: {},
      },

      matchedKeywords: {
        type: [String],

        default: [],
      },

      missingKeywords: {
        type: [String],

        default: [],
      },
      dateConsistency: {
  invalidDates: {
    type: [String],
    default: [],
  },

  overlappingDates: {
    type: [String],
    default: [],
  },

  reversedDateRanges: {
    type: [String],
    default: [],
  },

  inconsistentDateFormats: {
    type: [String],
    default: [],
  },

  missingDates: {
    type: [String],
    default: [],
  },

  score: {
    type: Number,
    default: 0,
  },

  issues: {
    type: [String],
    default: [],
  },

  suggestions: {
    type: [String],
    default: [],
  },
},

      recommendations: [
        {
          title: {
            type: String,

            required: true,
          },

          description: {
            type: String,

            required: true,
          },

          priority: {
            type: String,

            enum: [
              "critical",
              "high",
              "medium",
              "low",
            ],

            default: "medium",
          },


          category: {
  type: String,
  default: "keywords",
},

impact: {
  type: Number,
  default: 0,
},

actionable: {
  type: Boolean,
  default: true,
},

suggestedFix: {
  type: String,
  default: "",
},

evidence: {
  type: String,
  default: "",
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

export const ResumeAnalysis =
  mongoose.model<IResumeAnalysis>(
    "ResumeAnalysis",
    resumeAnalysisSchema
  );