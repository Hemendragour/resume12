import { useResumeStore } from "../../../../../../store/resume.store";
import SectionHeader from "../shared/SectionHeader";
import { EnhancvModernTheme as T } from "../theme.enhancv-modern";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const strengths = resume.strengths ?? [];

  if (strengths.length === 0) return null;

  const section = resume.sections.find((s) => s.type === "strengths");

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : "Strengths"
        }
      />

      <div className={`grid grid-cols-3 gap-8 ${T.spacing.itemHeader}`}>
        {strengths.map((item, index) => (
          <div key={index} className="min-w-0">
            <h3
              className={`
                ${T.fontSize.itemSubtitle}
                ${T.fontWeight.heading}
                ${T.colors.heading}
                ${T.lineHeight.title}
                mb-1
              `}
            >
              {item.title}
            </h3>

            <p
              className={`
                ${T.fontSize.body}
                ${T.colors.body}
                ${T.lineHeight.body}
              `}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}