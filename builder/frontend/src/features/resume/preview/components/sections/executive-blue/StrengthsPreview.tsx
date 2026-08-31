import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const strengths = resume.strengths ?? [];
  if (!strengths.length) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Strengths
      </h2>

      <div className="mt-2 space-y-2">
        {strengths.map((s, i) => (
          <div key={i}>
            <p
              className={`font-semibold ${T.fontSize.itemTitle} ${T.colors.accent}`}
            >
              {s.title}
            </p>
            {s.description && (
              <p className={`${T.fontSize.body} ${T.colors.body}`}>
                {s.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
