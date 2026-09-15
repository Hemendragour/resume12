import SummaryPreview from "./sections/SummaryPreview";
import ExperiencePreview from "./sections/ExperiencePreview";
import EducationPreview from "./sections/EducationPreview";
import ProjectsPreview from "./sections/ProjectsPreview";
import InternshipPreview from "./sections/InternshipPreview";
import AwardsPreview from "./sections/AwardsPreview";
import StrengthsPreview from "./sections/StrengthsPreview";
import InterestsPreview from "./sections/InterestsPreview";
import AchievementsPreview from "./sections/AchievementsPreview";
import type { ResumeSection } from "../../../types/resume.types";

// "skills", "languages", and "certifications" are always rendered in the
// Sidebar — they are intentionally excluded from the main panel.
type MainPanelSectionType = Exclude<
  ResumeSection["type"],
  "personalInfo" | "custom" | "skills" | "languages" | "certifications"
>;

type SectionComponent = () => React.ReactElement | null;

export const sectionComponentMap: Record<MainPanelSectionType, SectionComponent> = {
  summary: SummaryPreview,
  experience: ExperiencePreview,
  education: EducationPreview,
  projects: ProjectsPreview,
  internships: InternshipPreview,
  awards: AwardsPreview,
  strengths: StrengthsPreview,
  interests: InterestsPreview,
  achievements: AchievementsPreview,
};
