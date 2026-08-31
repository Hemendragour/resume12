import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function InternshipPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (resume.internships.length === 0) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Internships
      </h2>

      <div className="mt-3 space-y-3">
        {resume.internships.map((intern, index) => (
          <div key={index}>
            <div className="flex items-baseline justify-between">
              <p
                className={`${T.fontSize.itemTitle} font-bold ${T.colors.heading}`}
              >
                {intern.role}{" "}
                {intern.company && <span>| {intern.company}</span>}
              </p>
              <span className={`${T.fontSize.date} ${T.colors.muted}`}>
                {formatMonthYear(intern.startDate)} -{" "}
                {intern.currentlyInterning
                  ? "Present"
                  : formatMonthYear(intern.endDate)}
              </span>
            </div>

            {intern.responsibilities.length > 0 && (
              <ul
                className={`mt-1 space-y-0.5 pl-4 ${T.fontSize.body} leading-5 ${T.colors.body}`}
              >
                {intern.responsibilities.map((item, i) => (
                  <li key={i} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {intern.achievements?.length ? (
              <ul
                className={`mt-1 space-y-0.5 pl-4 ${T.fontSize.body} leading-5 ${T.colors.body}`}
              >
                {intern.achievements.map((item, i) => (
                  <li key={i} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
