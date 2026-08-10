import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const certifications = resume.certifications ?? [];

  if (!certifications.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "certifications"
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Certifications"
        }
      />

      <ul
        className={`
          ${T.list.bullet}
          ${T.spacing.bullet}
          ${T.fontSize.body}
          ${T.lineHeight.body}
          ${T.colors.body}
        `}
      >
        {certifications.map((certification, index) => (
          <li key={index}>{certification}</li>
        ))}
      </ul>
    </section>
  );
}