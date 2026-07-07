import { useResumeStore } from "../../../../store/resume.store";

import SummaryPreview from "./sections/SummaryPreview";
import SkillsPreview from "./sections/SkillsPreview";
import ExperiencePreview from "./sections/ExperiencePreview";
import EducationPreview from "./sections/EducationPreview";
import ProjectsPreview from "./sections/ProjectsPreview";
import LanguagesPreview from "./sections/LanguagesPreview";
import CertificationsPreview from "./sections/CertificationsPreview";
import AwardsPreview from "./sections/AwardsPreview";
import InterestsPreview from "./sections/InterestsPreview";
import PersonalInfoPreview from "./sections/PersonalInfoPreview";

import CustomSectionPreview from "./sections/CustomSectionPreview";

export default function DynamicSectionRenderer() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const sections = [...resume.sections]
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {sections.map((section) => {
        const customSection = resume?.customSections.find(
          (item) => item.id === section.id,
        );

        if (customSection) {
          return (
            <CustomSectionPreview key={section.id} sectionId={section.id} />
          );
        }
        switch (section.type) {
          case "summary":
            return <SummaryPreview key={section.id} />;
          case "skills":
            return <SkillsPreview key={section.id} />;

          case "experience":
            return <ExperiencePreview key={section.id} />;

          case "education":
            return <EducationPreview key={section.id} />;

          case "projects":
            return <ProjectsPreview key={section.id} />;

          case "languages":
            return <LanguagesPreview key={section.id} />;

          case "certifications":
            return <CertificationsPreview key={section.id} />;

          case "awards":
            return <AwardsPreview key={section.id} />;

          case "interests":
            return <InterestsPreview key={section.id} />;

          case "personalInfo":
            return <PersonalInfoPreview key={section.id} />;

          default:
            return null;
        }
      })}
    </>
  );
}
