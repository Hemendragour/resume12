// import { create } from "zustand";

// import type {
//   Resume,
// } from "../features/resume/types/resume.types";

// interface ResumeState {
//   resume: Resume | null;

//   setResume: (
//     resume: Resume
//   ) => void;

//   updatePersonalInfo: (
//     data: Partial<Resume["personalInfo"]>
//   ) => void;
// }

// export const useResumeStore =
//   create<ResumeState>((set) => ({
//     resume: null,

//     setResume: (resume) =>
//       set({
//         resume,
//       }),

//     updatePersonalInfo: (data) =>
//       set((state) => {
//         if (!state.resume) return state;

//         return {
//           resume: {
//             ...state.resume,

//             personalInfo: {
//               ...state.resume.personalInfo,

//               ...data,
//             },
//           },
//         };
//       }),
//   }));

// import { create } from "zustand";

// import type {
//   Resume,
// } from "../features/resume/types/resume.types";

// interface ResumeState {
//   resume: Resume | null;
 

//   setResume: (
//     resume: Resume
//   ) => void;

//   updatePersonalInfo: (
//     data: Partial<Resume["personalInfo"]>
//   ) => void;


    
// }

// export const useResumeStore =
//   create<ResumeState>((set) => ({
//     resume: null,

//     setResume: (resume) =>
//       set({
//         resume,
//       }),

//     updatePersonalInfo: (data) =>
//       set((state) => {
//         if (!state.resume) return state;

//         return {
//           resume: {
//             ...state.resume,

//             personalInfo: {
//               ...state.resume.personalInfo,
//               ...data,
//             },
//           },
//         };
//       }),
//   }));


import { create } from "zustand";

import type {
  Resume,
} from "../features/resume/types/resume.types";

interface ResumeState {
  resume: Resume | null;

  setResume: (
    resume: Resume
  ) => void;

  updatePersonalInfo: (
    data: Partial<Resume["personalInfo"]>
  ) => void;

  updateSummary: (
    summary: string
  ) => void;

  updateExperience: (
  experience: Resume["experience"]
) => void;


addExperience: (
  experience: Resume["experience"][0]
) => void;

deleteExperience: (
  index: number
) => void;



updateExperienceItem: (
  index: number,
  experience: Resume["experience"][0]
) => void;



addEducation: (
  education: Resume["education"][number]
) => void;

updateEducationItem: (
  index: number,
  education: Resume["education"][number]
) => void;

deleteEducation: (
  index: number
) => void;

addSkill: (skill: string) => void;

removeSkill: (skill: string) => void;

updateSkills: (skills: string[]) => void;

addProject: (
  project: Resume["projects"][number]
) => void;

updateProject: (
  index: number,
  project: Resume["projects"][number]
) => void;

deleteProject: (
  index: number
) => void;


addLanguage: (
  language: string
) => void;

removeLanguage: (
  language: string
) => void;

addCertification: (
  certification: string
) => void;

removeCertification: (
  certification: string
) => void;


addAward: (award: string) => void;

removeAward: (award: string) => void;


addInterest: (
  interest: string
) => void;

removeInterest: (
  interest: string
) => void;

updateResumeSettings: (
  data: {
    title?: string;
    targetRole?: string;
    templateId?: string;
    status?: "draft" | "completed";
  }
) => void;


updateTemplate: (
  templateId: Resume["templateId"]
) => void;

}

export const useResumeStore =
  create<ResumeState>((set) => ({
    resume: null,

    setResume: (resume) =>
      set({
        resume,
      }),

    updatePersonalInfo: (data) =>
      set((state) => {
        if (!state.resume) return state;

        return {
          resume: {
            ...state.resume,

            personalInfo: {
              ...state.resume.personalInfo,
              ...data,
            },
          },
        };
      }),

    updateSummary: (summary) =>
      set((state) => ({
        resume: state.resume
          ? {
              ...state.resume,
              summary,
            }
          : null,
      })),


      updateExperience: (experience) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        experience,
      },
    };
  }),


  
  
addExperience: (experience) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        experience: [
          ...state.resume.experience,
          experience,
        ],
      },
    };
  }),

deleteExperience: (index) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        experience:
          state.resume.experience.filter(
            (_, i) => i !== index
          ),
      },
    };
  }),

  updateExperienceItem: (index, experience) =>
  set((state) => {
    if (!state.resume) return state;

    const updatedExperience = [...state.resume.experience];

    updatedExperience[index] = experience;

    return {
      resume: {
        ...state.resume,
        experience: updatedExperience,
      },
    };
  }),


  addEducation: (education) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        education: [
          ...state.resume.education,
          education,
        ],
      },
    };
  }),

updateEducationItem: (index, education) =>
  set((state) => {
    if (!state.resume) return state;

    const updated = [...state.resume.education];

    updated[index] = education;

    return {
      resume: {
        ...state.resume,
        education: updated,
      },
    };
  }),

deleteEducation: (index) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        education:
          state.resume.education.filter(
            (_, i) => i !== index
          ),
      },
    };
  }),

  addSkill: (skill) =>
  set((state) => {
    if (!state.resume) return state;

    if (
      state.resume.skills.some(
        (s) =>
          s.toLowerCase() ===
          skill.toLowerCase()
      )
    ) {
      return state;
    }

    return {
      resume: {
        ...state.resume,
        skills: [
          ...state.resume.skills,
          skill,
        ],
      },
    };
  }),

removeSkill: (skill) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        skills:
          state.resume.skills.filter(
            (s) => s !== skill
          ),
      },
    };
  }),


  addProject: (project) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        projects: [
          ...state.resume.projects,
          project,
        ],
      },
    };
  }),

updateProject: (index, project) =>
  set((state) => {
    if (!state.resume) return state;

    const updated = [...state.resume.projects];

    updated[index] = project;

    return {
      resume: {
        ...state.resume,
        projects: updated,
      },
    };
  }),

deleteProject: (index) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        projects:
          state.resume.projects.filter(
            (_, i) => i !== index
          ),
      },
    };
  }),


  addLanguage: (language) =>
  set((state) => {
    if (!state.resume) return state;

    if (
      state.resume.languages.some(
        (l) =>
          l.toLowerCase() ===
          language.toLowerCase()
      )
    ) {
      return state;
    }

    return {
      resume: {
        ...state.resume,
        languages: [
          ...state.resume.languages,
          language,
        ],
      },
    };
  }),

removeLanguage: (language) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        languages:
          state.resume.languages.filter(
            (l) => l !== language
          ),
      },
    };
  }),

  addCertification: (certification) =>
  set((state) => {
    if (!state.resume) return state;

    if (
      state.resume.certifications.some(
        (c) =>
          c.toLowerCase() ===
          certification.toLowerCase()
      )
    ) {
      return state;
    }

    return {
      resume: {
        ...state.resume,
        certifications: [
          ...state.resume.certifications,
          certification,
        ],
      },
    };
  }),

removeCertification: (certification) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        certifications:
          state.resume.certifications.filter(
            (c) => c !== certification
          ),
      },
    };
  }),


  addAward: (award) =>
  set((state) => {
    if (!state.resume) return state;

    if (
      state.resume.awards.some(
        (a) => a.toLowerCase() === award.toLowerCase()
      )
    ) {
      return state;
    }

    return {
      resume: {
        ...state.resume,
        awards: [...state.resume.awards, award],
      },
    };
  }),

removeAward: (award) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        awards: state.resume.awards.filter(
          (a) => a !== award
        ),
      },
    };
  }),


  addInterest: (interest) =>
  set((state) => {
    if (!state.resume) return state;

    if (
      state.resume.interests.some(
        (i) =>
          i.toLowerCase() ===
          interest.toLowerCase()
      )
    ) {
      return state;
    }

    return {
      resume: {
        ...state.resume,
        interests: [
          ...state.resume.interests,
          interest,
        ],
      },
    };
  }),

removeInterest: (interest) =>
  set((state) => {
    if (!state.resume) return state;

    return {
      resume: {
        ...state.resume,
        interests:
          state.resume.interests.filter(
            (i) => i !== interest
          ),
      },
    };
  }),

  updateResumeSettings: (data: any) =>  // data ka proper type daal do
  set((state) => ({
    resume: state.resume
      ? {
          ...state.resume,
          ...data,
        }
      : state.resume,
  })),

  updateTemplate: (
  templateId
) =>
  set((state) => {
    if (!state.resume)
      return state;

    return {
      resume: {
        ...state.resume,
        templateId,
      },
    };
  }),


    // ... all your existing actions

  updateSkills: (newSkills: string[]) =>
    set((state) => {
      if (!state.resume) return state;

      return {
        resume: {
          ...state.resume,
          skills: newSkills,
        },
      };
    }),

 


  // UNSER SAB 
  }));

  