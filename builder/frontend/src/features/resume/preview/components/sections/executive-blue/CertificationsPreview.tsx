import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Certifications & Achievements
      </h2>

      {resume.certifications.length === 0 ? (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>
          No certifications added.
        </p>
      ) : (
        <ul className="mt-2 space-y-1">
          {resume.certifications.map((cert, i) => (
            <li
              key={i}
              className={`flex gap-2 ${T.fontSize.body} ${T.colors.body}`}
            >
              <span className={T.colors.accent}>●</span>
              <span className="font-semibold">{cert}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
