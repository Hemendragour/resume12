import PersonalInfoSection from "../sections/PersonalInfoSection";
import SummarySection from "../sections/SummarySection";
import ExperienceSection from "../sections/ExperienceSection";
import EducationSection from "../sections/EducationSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import LanguagesSection from "../sections/LanguagesSection";
import CertificationsSection from "../sections/CertificationsSection";
import AwardsSection from "../sections/AwardsSection";
import InterestsSection from "../sections/InterestsSection";
import TemplatesSection from "../sections/TemplatesSection";
import SettingsSection from "../sections/SettingsSection";
import StrengthsSection from "../sections/StrengthsSection";

import { useResumeStore } from "../../../../store/resume.store";
import CustomSection from "../sections/CustomSection";
import InternshipSection from "../../components/sections/InternshipSection";

interface Props {
  activeSection: string;
}

const sectionComponentMap = {
  personalInfo: PersonalInfoSection,
  internships: InternshipSection,
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  languages: LanguagesSection,
  certifications: CertificationsSection,
  awards: AwardsSection,
  interests: InterestsSection,
  templates: TemplatesSection,
  settings: SettingsSection,
  strengths: StrengthsSection,
};

export default function DynamicEditorRenderer({ activeSection }: Props) {
  const resume = useResumeStore((state) => state.resume);
  const Component =
    sectionComponentMap[activeSection as keyof typeof sectionComponentMap];

  const customSection = resume?.customSections.find(
    (section) => section.id === activeSection,
  );

  if (customSection) {
    return <CustomSection sectionId={activeSection} />;
  }

  if (!Component) {
    return <div className="text-center text-gray-500">Section not found</div>;
  }
  return <Component />;
}
