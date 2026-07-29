import SummaryPreview from "./sections/split-label/SummaryPreview";
import SkillsPreview from "./sections/split-label/SkillsPreview";
import ExperiencePreview from "./sections/split-label/ExperiencePreview";
import EducationPreview from "./sections/split-label/EducationPreview";
import ProjectsPreview from "./sections/split-label/ProjectsPreview";
// import LanguagesPreview from "./sections/split-label/LanguagesPreview";
import CertificationsPreview from "./sections/split-label/CertificationsPreview";
// import AwardsPreview from "./sections/split-label/AwardsPreview";
import InterestsPreview from "./sections/split-label/InterestsPreview";
import InternshipPreview from "./sections/split-label/InternshipPreview";
import LanguagesPreview from "./sections/split-label/LanguagesPreview";

export const SplitLabelSectionRegistry = {
  summary: SummaryPreview,
  skills: SkillsPreview,
  experience: ExperiencePreview,
  education: EducationPreview,
  projects: ProjectsPreview,
  languages: LanguagesPreview,
  certifications: CertificationsPreview,
//   awards: AwardsPreview,
  interests: InterestsPreview,
   internships: InternshipPreview,
};