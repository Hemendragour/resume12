import { Sparkles } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";
import SectionHeader from "../../shared/professional-modern/SectionHeader";
import { ProfessionalModernTheme as T } from "../../theme.professional-modern";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const strengths = resume.strengths ?? [];

  if (strengths.length === 0) return null;

  const strengthsSection = resume.sections.find(
    (section) => section.id === "strengths",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          strengthsSection?.displayTitle?.trim() ||
          strengthsSection?.title ||
          "Strengths"
        }
        icon={<Sparkles size={16} />}
      />

      <div className={`mt-3 space-y-2 ${T.fontSize.body} ${T.colors.body}`}>
        {strengths.map((s, index) => (
          <div key={index}>
            <span className="font-semibold">{s.title}</span>
            {s.description ? <span>{" - " + s.description}</span> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
