import SummaryPreview from "./sections/SummaryPreview";
import ExperiencePreview from "./sections/ExperiencePreview";
import EducationPreview from "./sections/EducationPreview";
import ProjectsPreview from "./sections/ProjectsPreview";
import InternshipPreview from "./sections/InternshipPreview";
import CertificationsPreview from "./sections/CertificationsPreview";
import AwardsPreview from "./sections/AwardsPreview";
import StrengthsPreview from "./sections/StrengthsPreview";
import InterestsPreview from "./sections/InterestsPreview";
import AchievementsPreview from "./sections/AchievementsPreview";
import type { ResumeSection } from "../../../types/resume.types";

// "skills" and "languages" are intentionally omitted here — they always
// render in the Sidebar component instead, regardless of section order.
type MainPanelSectionType = Exclude<
  ResumeSection["type"],
  "personalInfo" | "custom" | "skills" | "languages"
>;

type SectionComponent = () => React.ReactElement | null;

export const sectionComponentMap: Record<MainPanelSectionType, SectionComponent> = {
  summary: SummaryPreview,
  experience: ExperiencePreview,
  education: EducationPreview,
  projects: ProjectsPreview,
  internships: InternshipPreview,
  certifications: CertificationsPreview,
  awards: AwardsPreview,
  strengths: StrengthsPreview,
  interests: InterestsPreview,
  achievements: AchievementsPreview,
};
