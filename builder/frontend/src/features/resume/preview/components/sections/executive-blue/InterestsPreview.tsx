import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.interests.length) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Interests
      </h2>

      <div className="mt-2 flex flex-wrap gap-2">
        {resume.interests.map((interest, i) => (
          <span
            key={i}
            className={`rounded border px-2 py-0.5 ${T.fontSize.body} ${T.colors.body} border-slate-300`}
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  );
}
