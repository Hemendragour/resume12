import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  const summarySection = resume.sections.find(
    (section) => section.id === "summary",
  );

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        {summarySection?.displayTitle?.trim() ||
          summarySection?.title ||
          "Professional Summary"}
      </h2>
      {resume.summary ? (
        <p className={`mt-2 ${T.fontSize.body} leading-5 ${T.colors.body}`}>
          {resume.summary}
        </p>
      ) : (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>
          No summary added.
        </p>
      )}
    </section>
  );
}
