// import { z } from "zod";

// export const createResumeSchema = z.object({
//   personalInfo: z.object({
//     fullName: z.string().min(2),
//     title: z.string().min(2),
//     email: z.string().email(),
//     phone: z.string().optional(),
//     linkedIn: z.string().optional(),
//     github: z.string().optional(),
//     portfolio: z.string().optional(),
//   }),

//   summary: z.string().optional(),

//   skills: z.array(z.string()).optional(),
//   templateId: z.string().optional(),

//   experience: z
//     .array(
//       z.object({
//         company: z.string(),
//         position: z.string(),
//         startDate: z.string(),
//         endDate: z.string().optional(),
//         responsibilities: z.array(z.string()).optional(),
//       })
//     )
//     .optional(),

//   education: z
//     .array(
//       z.object({
//         institution: z.string(),
//         degree: z.string(),
//         fieldOfStudy: z.string(),
//         startYear: z.number(),
//         endYear: z.number().optional(),
//       })
//     )
//     .optional(),

//   projects: z
//     .array(
//       z.object({
//         title: z.string(),
//         description: z.string(),
//         technologies: z.array(z.string()),
//         link: z.string().optional(),
//       })
//     )
//     .optional(),
// });

// export const updateResumeSchema = createResumeSchema.partial();



import { z } from "zod";

const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),

  position: z.string().min(1, "Position is required"),

  startDate: z.string().min(1, "Start date is required"),

  endDate: z.string().optional(),

  currentlyWorking: z.boolean().optional(),

  responsibilities: z.array(z.string()).optional(),

  achievements: z.array(z.string()).optional(),
});

const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),

  degree: z.string().min(1, "Degree is required"),

  fieldOfStudy: z.string().min(1, "Field of study is required"),

  startYear: z.number(),

  endYear: z.number().optional(),

  cgpa: z.string().optional(),
});

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),

  description: z.string().min(1, "Project description is required"),

  technologies: z.array(z.string()),

  link: z.string().url().optional(),

  github: z.string().url().optional(),
});

export const createResumeSchema = z.object({
  title: z.string().min(2, "Resume title is required"),

  version: z.number().optional(),

  targetRole: z.string().optional(),

  personalInfo: z
  .object({
    fullName: z.string().optional(),

    title: z.string().optional(),

    email: z
      .union([z.string().email(), z.literal("")])
      .optional(),

    phone: z.string().optional(),

    address: z.string().optional(),

    linkedIn: z
      .union([z.string().url(), z.literal("")])
      .optional(),

    github: z
      .union([z.string().url(), z.literal("")])
      .optional(),

    portfolio: z
      .union([z.string().url(), z.literal("")])
      .optional(),

    photo: z.string().optional(),
  })
  .optional(),
  summary: z.string().optional(),

  skills: z.array(z.string()).optional(),

  experience: z.array(experienceSchema).optional(),

  education: z.array(educationSchema).optional(),

  projects: z.array(projectSchema).optional(),

  certifications: z.array(z.string()).optional(),

  languages: z.array(z.string()).optional(),

  awards: z.array(z.string()).optional(),

  interests: z.array(z.string()).optional(),

  templateId: z.string().optional(),
});

export const updateResumeSchema =
  createResumeSchema.partial();