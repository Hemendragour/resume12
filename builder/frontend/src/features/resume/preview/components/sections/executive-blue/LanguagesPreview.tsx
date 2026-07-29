import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="mt-5">
      <h2 className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}>
        Languages
      </h2>
      {resume.languages.length === 0 ? (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>No languages added.</p>
      ) : (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.body}`}>
          {resume.languages.map((l) => l.name).join(" | ")}
        </p>
      )}
    </section>
  );
}