import { Award } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../../shared/professional-modern/SectionHeader";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const certifications = resume.certifications ?? [];

  const certificationsSection = resume.sections.find(
    (section) => section.id === "certifications",
  );

  if (certifications.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          certificationsSection?.displayTitle?.trim() ||
          certificationsSection?.title ||
          "Certifications"
        }
        icon={<Award size={16} />}
      />

      <ul className="mt-3 list-disc list-inside">
        {certifications.map((certificate, index) => (
          <li key={index} className={`${T.fontSize.body} ${T.colors.body}`}>
            {certificate}
          </li>
        ))}
      </ul>
    </section>
  );
}
