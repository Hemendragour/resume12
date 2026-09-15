import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

import SectionHeader from "../shared/SectionHeader";
import { LatexSidebarTheme as T } from "../theme.latex-sidebar";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const experience = resume.experience ?? [];
  if (!experience.length) return null;

  const section = resume.sections.find((s) => s.type === "experience");

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Work Experience"
        }
      />

      <div className="space-y-4">
        {experience.map((job, index) => (
          <div key={index}>
            <div className={T.layout.between}>
              <div>
                <h3
                  className={`${T.fontSize.itemTitle} ${T.fontWeight.bold} ${T.colors.heading}`}
                >
                  {job.position}
                </h3>
                <p className={`${T.fontSize.itemSubtitle} ${T.colors.body} italic`}>
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
              </div>

              <p
                className={`${T.fontSize.date} ${T.colors.muted} shrink-0 whitespace-nowrap`}
              >
                {formatMonthYear(job.startDate)}
                {" – "}
                {job.currentlyWorking ? "Present" : formatMonthYear(job.endDate)}
              </p>
            </div>

            {(job.responsibilities?.length > 0 ||
              (job.achievements?.length ?? 0) > 0) && (
              <ul
                className={`
                  ${T.list.bullet}
                  ${T.spacing.bullet}
                  ${T.spacing.itemHeader}
                  ${T.fontSize.body}
                  ${T.lineHeight.body}
                  ${T.colors.body}
                `}
              >
                {job.responsibilities
                  ?.filter((line) => line.trim() !== "")
                  .map((line, i) => <li key={`r-${i}`}>{line}</li>)}
                {job.achievements
                  ?.filter((line) => line.trim() !== "")
                  .map((line, i) => <li key={`a-${i}`}>{line}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
