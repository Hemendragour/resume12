import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

import SectionHeader from "../shared/SectionHeader";
import { ExecutiveSidebarTheme as T } from "../theme.executive-sidebar";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const experience = resume.experience ?? [];

  if (!experience.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "experience",
  );

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
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3
                  className={`${T.fontSize.itemTitle} ${T.fontWeight.bold} ${T.colors.heading}`}
                >
                  {job.position}
                </h3>
                <p className={`${T.fontSize.itemSubtitle} ${T.colors.body}`}>
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
              </div>

              {/* Dates stay plain/muted — never the navy accent */}
              <p
                className={`${T.fontSize.date} ${T.colors.muted} shrink-0 whitespace-nowrap`}
              >
                {formatMonthYear(job.startDate)}
                {" - "}
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
