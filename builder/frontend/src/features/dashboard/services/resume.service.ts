// import api from "../../../api/axios";

// export const getAllResumes = async () => {
//   const response = await api.get("/resumes");

//   return response.data;
// };


// import { Resume } from "../../../";

// export async function getAISuggestions(
//   resumeId: string
// ) {
//   const resume =
//     await Resume.findById(resumeId);

//   if (!resume) {
//     throw new Error(
//       "Resume not found"
//     );
//   }

//   const suggestions: string[] = [];

//   if (!resume.summary)
//     suggestions.push("Add Summary");

//   if (
//     resume.skills.length < 5
//   ) {
//     suggestions.push(
//       "Add More Skills"
//     );
//   }

//   if (
//     resume.projects.length === 0
//   ) {
//     suggestions.push(
//       "Add Projects"
//     );
//   }

//   if (
//     resume.experience.length === 0
//   ) {
//     suggestions.push(
//       "Add Experience"
//     );
//   }

//   return suggestions;
// }