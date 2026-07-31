import { Award } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";

import { EnhancvModernTheme as T } from "../theme.enhancv-modern";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const certifications = resume.certifications ?? [];

  const certificationsSection = resume.sections.find(
    (section) => section.id === "certifications"
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
        // icon={<Award size={16} />}
      />

      <div className="mt-4 space-y-3">
        {certifications.map((certificate, index) => (
          <div
            key={index}
            className="border-l-2 border-slate-300 pl-4"
          >
            <p
              className={`
                ${T.fontSize.body}
                ${T.colors.body}
              `}
            >
              {certificate}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}