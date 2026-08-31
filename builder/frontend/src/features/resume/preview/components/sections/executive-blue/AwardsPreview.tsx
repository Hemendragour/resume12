import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const awards = resume.awards ?? [];
  if (!awards.length) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Awards
      </h2>

      <ul className="mt-2 space-y-1">
        {awards.map((award, i) => (
          <li
            key={i}
            className={`flex gap-2 ${T.fontSize.body} ${T.colors.body}`}
          >
            <span className={T.colors.accent}>●</span>
            <span>{award}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
